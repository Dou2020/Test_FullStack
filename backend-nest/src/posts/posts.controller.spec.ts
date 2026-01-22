import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

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
  };

  const mockPostsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    bulkCreate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Verifica que el controlador se haya creado correctamente
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    // Verifica que el endpoint POST /posts cree un nuevo post correctamente
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        body: 'This is a test post content',
        author: 'John Doe',
        tags: ['test', 'jest'],
        imageUrl: 'https://example.com/image.jpg',
        published: true,
      };

      mockPostsService.create.mockResolvedValue(mockPost);

      const result = await controller.create(createPostDto);

      expect(result).toEqual(mockPost);
      expect(service.create).toHaveBeenCalledWith(createPostDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    // Verifica que el controlador maneje correctamente los errores del servicio
    it('should handle service errors', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        body: 'This is a test post content',
        author: 'John Doe',
      };

      const error = new Error('Database error');
      mockPostsService.create.mockRejectedValue(error);

      await expect(controller.create(createPostDto)).rejects.toThrow('Database error');
      expect(service.create).toHaveBeenCalledWith(createPostDto);
    });
  });

  describe('bulkCreate', () => {
    // Verifica que el endpoint POST /posts/bulk cree múltiples posts
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

      mockPostsService.bulkCreate.mockResolvedValue(createdPosts);

      const result = await controller.bulkCreate(createPostsDto);

      expect(result).toEqual(createdPosts);
      expect(service.bulkCreate).toHaveBeenCalledWith(createPostsDto);
      expect(service.bulkCreate).toHaveBeenCalledTimes(1);
    });

    // Verifica que maneje correctamente un arreglo vacío sin errores
    it('should handle empty array', async () => {
      mockPostsService.bulkCreate.mockResolvedValue([]);

      const result = await controller.bulkCreate([]);

      expect(result).toEqual([]);
      expect(service.bulkCreate).toHaveBeenCalledWith([]);
    });
  });

  describe('findAll', () => {
    // Verifica que el endpoint GET /posts retorne todos los posts
    it('should return an array of posts', async () => {
      const posts = [mockPost, { ...mockPost, _id: '507f1f77bcf86cd799439012' }];
      mockPostsService.findAll.mockResolvedValue(posts);

      const result = await controller.findAll();

      expect(result).toEqual(posts);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    // Verifica que retorne un arreglo vacío cuando no hay posts disponibles
    it('should return empty array if no posts found', async () => {
      mockPostsService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    // Verifica que el endpoint GET /posts/:id retorne un post específico
    it('should return a single post', async () => {
      const postId = '507f1f77bcf86cd799439011';
      mockPostsService.findOne.mockResolvedValue(mockPost);

      const result = await controller.findOne(postId);

      expect(result).toEqual(mockPost);
      expect(service.findOne).toHaveBeenCalledWith(postId);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    // Verifica que retorne null cuando el post solicitado no existe
    it('should return null if post not found', async () => {
      mockPostsService.findOne.mockResolvedValue(null);

      const result = await controller.findOne('nonexistent-id');

      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith('nonexistent-id');
    });
  });

  describe('update', () => {
    // Verifica que el endpoint PATCH /posts/:id actualice un post correctamente
    it('should update a post', async () => {
      const postId = '507f1f77bcf86cd799439011';
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Title',
        body: 'Updated content',
      };
      const updatedPost = { ...mockPost, ...updatePostDto };

      mockPostsService.update.mockResolvedValue(updatedPost);

      const result = await controller.update(postId, updatePostDto);

      expect(result).toEqual(updatedPost);
      expect(service.update).toHaveBeenCalledWith(postId, updatePostDto);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    // Verifica que retorne null cuando se intenta actualizar un post inexistente
    it('should return null if post to update not found', async () => {
      const updatePostDto: UpdatePostDto = { title: 'New Title' };
      mockPostsService.update.mockResolvedValue(null);

      const result = await controller.update('nonexistent-id', updatePostDto);

      expect(result).toBeNull();
      expect(service.update).toHaveBeenCalledWith('nonexistent-id', updatePostDto);
    });

    // Verifica que el controlador maneje actualizaciones parciales (solo algunos campos)
    it('should handle partial updates', async () => {
      const postId = '507f1f77bcf86cd799439011';
      const updatePostDto: UpdatePostDto = { published: false };
      const updatedPost = { ...mockPost, published: false };

      mockPostsService.update.mockResolvedValue(updatedPost);

      const result = await controller.update(postId, updatePostDto);

      expect(result).not.toBeNull();
      expect(result!.published).toBe(false);
      expect(service.update).toHaveBeenCalledWith(postId, updatePostDto);
    });
  });

  describe('remove', () => {
    // Verifica que el endpoint DELETE /posts/:id realice un soft delete
    it('should soft delete a post', async () => {
      const postId = '507f1f77bcf86cd799439011';
      const deletedPost = { ...mockPost, deleteAt: new Date() };

      mockPostsService.remove.mockResolvedValue(deletedPost);

      const result = await controller.remove(postId);

      expect(result).toEqual(deletedPost);
      expect(service.remove).toHaveBeenCalledWith(postId);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    // Verifica que retorne null cuando se intenta eliminar un post que no existe
    it('should return null if post to delete not found', async () => {
      mockPostsService.remove.mockResolvedValue(null);

      const result = await controller.remove('nonexistent-id');

      expect(result).toBeNull();
      expect(service.remove).toHaveBeenCalledWith('nonexistent-id');
    });
  });
});
