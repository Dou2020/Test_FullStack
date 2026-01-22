import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comment } from './entities/comment.entity';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

describe('CommentsService', () => {
  let service: CommentsService;
  let model: Model<Comment>;

  const mockComment = {
    _id: '507f1f77bcf86cd799439011',
    postId: '507f1f77bcf86cd799439000',
    name: 'John Doe',
    email: 'john.doe@example.com',
    body: 'This is a test comment',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCommentModel = Object.assign(
    jest.fn().mockImplementation((dto) => ({
      ...dto,
      _id: mockComment._id,
      createdAt: mockComment.createdAt,
      updatedAt: mockComment.updatedAt,
      save: jest.fn().mockResolvedValue({
        ...dto,
        _id: mockComment._id,
        createdAt: mockComment.createdAt,
        updatedAt: mockComment.updatedAt,
      }),
    })),
    {
      find: jest.fn(),
      findOne: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      create: jest.fn(),
      exec: jest.fn(),
    },
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getModelToken(Comment.name),
          useValue: mockCommentModel,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    model = module.get<Model<Comment>>(getModelToken(Comment.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Verifica que el servicio se haya creado correctamente
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    // Verifica que se cree un nuevo comentario correctamente y se guarde en la base de datos
    it('should create a new comment', async () => {
      const createCommentDto: CreateCommentDto = {
        postId: '507f1f77bcf86cd799439000',
        name: 'John Doe',
        email: 'john.doe@example.com',
        body: 'This is a test comment',
      };

      const result = await service.create(createCommentDto);
      expect(result).toBeDefined();
      expect(result.name).toEqual(createCommentDto.name);
      expect(result.email).toEqual(createCommentDto.email);
      expect(result.body).toEqual(createCommentDto.body);
    });
  });

  describe('findAll', () => {
    // Verifica que se retorne un arreglo de comentarios que no han sido eliminados (soft delete)
    it('should return an array of comments', async () => {
      const comments = [mockComment, { ...mockComment, _id: '507f1f77bcf86cd799439012' }];
      
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(comments),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(comments);
      expect(model.find).toHaveBeenCalledWith({ deleteAt: { $exists: false } });
    });

    // Verifica que retorne un arreglo vacío cuando no hay comentarios en la base de datos
    it('should return empty array if no comments found', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    // Verifica que se retorne un comentario específico por su ID si no está eliminado
    it('should return a single comment', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockComment),
      } as any);

      const result = await service.findOne(commentId);
      expect(result).toEqual(mockComment);
      expect(model.findOne).toHaveBeenCalledWith({ 
        _id: commentId, 
        deleteAt: { $exists: false } 
      });
    });

    // Verifica que retorne null cuando el comentario no existe o fue eliminado
    it('should return null if comment not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.findOne('nonexistent-id');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    // Verifica que se actualice un comentario existente y retorne el comentario actualizado
    it('should update a comment', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      const updateCommentDto: UpdateCommentDto = {
        name: 'Updated Name',
        body: 'Updated comment',
      };
      const updatedComment = { ...mockComment, ...updateCommentDto };

      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedComment),
      } as any);

      const result = await service.update(commentId, updateCommentDto);
      expect(result).toEqual(updatedComment);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        commentId,
        updateCommentDto,
        { new: true },
      );
    });

    // Verifica que retorne null cuando se intenta actualizar un comentario que no existe
    it('should return null if comment to update not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.update('nonexistent-id', {});
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    // Verifica que se elimine permanentemente un comentario de la base de datos
    it('should delete a comment permanently', async () => {
      const commentId = '507f1f77bcf86cd799439011';

      jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockComment),
      } as any);

      const result = await service.remove(commentId);
      expect(result).toBeDefined();
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(commentId);
    });

    // Verifica que retorne null cuando se intenta eliminar un comentario que no existe
    it('should return null if comment to delete not found', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.remove('nonexistent-id');
      expect(result).toBeNull();
    });
  });
});
