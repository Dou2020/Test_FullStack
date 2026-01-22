import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let model: Model<Post>;

  const mockPost = {
    _id: '507f1f77bcf86cd799439011',
    title: 'Test Post',
    body: 'This is a test post content',
    author: 'John Doe',
    tags: ['test', 'jest'],
    imageUrl: 'https://example.com/image.jpg',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    save: jest.fn().mockResolvedValue(this),
  };

  const mockPostModel = Object.assign(
    jest.fn().mockImplementation((dto) => ({
      ...dto,
      _id: mockPost._id,
      createdAt: mockPost.createdAt,
      updatedAt: mockPost.updatedAt,
      save: jest.fn().mockResolvedValue({
        ...dto,
        _id: mockPost._id,
        createdAt: mockPost.createdAt,
        updatedAt: mockPost.updatedAt,
      }),
    })),
    {
      find: jest.fn(),
      findOne: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      insertMany: jest.fn(),
      create: jest.fn(),
      exec: jest.fn(),
    },
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    model = module.get<Model<Post>>(getModelToken(Post.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Verifica que el servicio se haya creado correctamente
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    // Verifica que se cree un nuevo post correctamente y se guarde en la base de datos
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        body: 'This is a test post content',
        author: 'John Doe',
        tags: ['test', 'jest'],
        imageUrl: 'https://example.com/image.jpg',
        published: true,
      };

      const result = await service.create(createPostDto);
      expect(result).toBeDefined();
      expect(result.title).toEqual(createPostDto.title);
      expect(result.body).toEqual(createPostDto.body);
      expect(result.author).toEqual(createPostDto.author);
    });
  });

  describe('findAll', () => {
    // Verifica que se retorne un arreglo de posts que no han sido eliminados (soft delete)
    it('should return an array of posts', async () => {
      const posts = [mockPost, { ...mockPost, _id: '507f1f77bcf86cd799439012' }];
      
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(posts),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(posts);
      expect(model.find).toHaveBeenCalledWith({ deleteAt: { $exists: false } });
    });

    // Verifica que retorne un arreglo vacío cuando no hay posts en la base de datos
    it('should return empty array if no posts found', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    // Verifica que se retorne un post específico por su ID si no está eliminado
    it('should return a single post', async () => {
      const postId = '507f1f77bcf86cd799439011';
      
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPost),
      } as any);

      const result = await service.findOne(postId);
      expect(result).toEqual(mockPost);
      expect(model.findOne).toHaveBeenCalledWith({ 
        _id: postId, 
        deleteAt: { $exists: false } 
      });
    });

    // Verifica que retorne null cuando el post no existe o fue eliminado
    it('should return null if post not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.findOne('nonexistent-id');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    // Verifica que se actualice un post existente y retorne el post actualizado
    it('should update a post', async () => {
      const postId = '507f1f77bcf86cd799439011';
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Title',
        body: 'Updated content',
      };
      const updatedPost = { ...mockPost, ...updatePostDto };

      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedPost),
      } as any);

      const result = await service.update(postId, updatePostDto);
      expect(result).toEqual(updatedPost);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        postId,
        updatePostDto,
        { new: true },
      );
    });

    // Verifica que retorne null cuando se intenta actualizar un post que no existe
    it('should return null if post to update not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.update('nonexistent-id', {});
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    // Verifica que se realice un soft delete estableciendo la fecha de eliminación
    it('should soft delete a post by setting deleteAt', async () => {
      const postId = '507f1f77bcf86cd799439011';
      const deletedPost = { ...mockPost, deleteAt: new Date() };

      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(deletedPost),
      } as any);

      const result = await service.remove(postId);
      expect(result).toBeDefined();
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        postId,
        expect.objectContaining({ deleteAt: expect.any(Date) }),
        { new: true },
      );
    });

    // Verifica que retorne null cuando se intenta eliminar un post que no existe
    it('should return null if post to delete not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.remove('nonexistent-id');
      expect(result).toBeNull();
    });
  });

  describe('bulkCreate', () => {
    // Verifica que se creen múltiples posts en una sola operación
    it('should create multiple posts', async () => {
      const createPostsDto: CreatePostDto[] = [
        {
          title: 'Post 1',
          body: 'Content 1',
          author: 'Author 1',
        },
        {
          title: 'Post 2',
          body: 'Content 2',
          author: 'Author 2',
        },
      ];

      const createdPosts = createPostsDto.map((dto, index) => ({
        ...mockPost,
        ...dto,
        _id: `507f1f77bcf86cd79943901${index}`,
      }));

      jest.spyOn(model, 'insertMany').mockResolvedValue(createdPosts as any);

      const result = await service.bulkCreate(createPostsDto);
      expect(result).toEqual(createdPosts);
      expect(model.insertMany).toHaveBeenCalledWith(createPostsDto);
    });

    // Verifica que retorne un arreglo vacío cuando se envía un arreglo vacío
    it('should return empty array for empty input', async () => {
      jest.spyOn(model, 'insertMany').mockResolvedValue([]);

      const result = await service.bulkCreate([]);
      expect(result).toEqual([]);
    });
  });
});
