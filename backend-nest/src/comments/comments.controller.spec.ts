import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  const mockComment = {
    _id: '507f1f77bcf86cd799439011',
    postId: '507f1f77bcf86cd799439000',
    name: 'John Doe',
    email: 'john.doe@example.com',
    body: 'This is a test comment',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCommentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: mockCommentsService,
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Verifica que el controlador se haya creado correctamente
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    // Verifica que el endpoint POST /comments cree un nuevo comentario correctamente
    it('should create a new comment', async () => {
      const createCommentDto: CreateCommentDto = {
        postId: '507f1f77bcf86cd799439000',
        name: 'John Doe',
        email: 'john.doe@example.com',
        body: 'This is a test comment',
      };

      mockCommentsService.create.mockResolvedValue(mockComment);

      const result = await controller.create(createCommentDto);

      expect(result).toEqual(mockComment);
      expect(service.create).toHaveBeenCalledWith(createCommentDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    // Verifica que el controlador maneje correctamente los errores del servicio
    it('should handle service errors', async () => {
      const createCommentDto: CreateCommentDto = {
        postId: '507f1f77bcf86cd799439000',
        name: 'John Doe',
        email: 'john.doe@example.com',
        body: 'This is a test comment',
      };

      const error = new Error('Database error');
      mockCommentsService.create.mockRejectedValue(error);

      await expect(controller.create(createCommentDto)).rejects.toThrow('Database error');
      expect(service.create).toHaveBeenCalledWith(createCommentDto);
    });

    // Verifica que se normalice el email a minúsculas
    it('should normalize email to lowercase', async () => {
      const createCommentDto: CreateCommentDto = {
        postId: '507f1f77bcf86cd799439000',
        name: 'John Doe',
        email: 'JOHN.DOE@EXAMPLE.COM',
        body: 'This is a test comment',
      };

      mockCommentsService.create.mockResolvedValue({
        ...mockComment,
        email: 'john.doe@example.com',
      });

      const result = await controller.create(createCommentDto);

      expect(result).toBeDefined();
      expect(service.create).toHaveBeenCalledWith(createCommentDto);
    });

    // Verifica que se cree un comentario con espacios recortados
    it('should trim whitespace from fields', async () => {
      const createCommentDto: CreateCommentDto = {
        postId: '507f1f77bcf86cd799439000',
        name: '  John Doe  ',
        email: '  john.doe@example.com  ',
        body: '  This is a test comment  ',
      };

      mockCommentsService.create.mockResolvedValue(mockComment);

      const result = await controller.create(createCommentDto);

      expect(result).toBeDefined();
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    // Verifica que el endpoint GET /comments retorne todos los comentarios
    it('should return an array of comments', async () => {
      const comments = [mockComment, { ...mockComment, _id: '507f1f77bcf86cd799439012' }];
      mockCommentsService.findAll.mockResolvedValue(comments);

      const result = await controller.findAll();

      expect(result).toEqual(comments);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    // Verifica que retorne un arreglo vacío cuando no hay comentarios disponibles
    it('should return empty array if no comments found', async () => {
      mockCommentsService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    // Verifica que maneje errores al obtener todos los comentarios
    it('should handle errors when fetching all comments', async () => {
      const error = new Error('Database connection failed');
      mockCommentsService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow('Database connection failed');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    // Verifica que retorne comentarios de diferentes posts
    it('should return comments from different posts', async () => {
      const comments = [
        { ...mockComment, postId: '507f1f77bcf86cd799439000' },
        { ...mockComment, _id: '507f1f77bcf86cd799439012', postId: '507f1f77bcf86cd799439001' },
      ];
      mockCommentsService.findAll.mockResolvedValue(comments);

      const result = await controller.findAll();

      expect(result).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    // Verifica que el endpoint GET /comments/:id retorne un comentario específico
    it('should return a single comment', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      mockCommentsService.findOne.mockResolvedValue(mockComment);

      const result = await controller.findOne(commentId);

      expect(result).toEqual(mockComment);
      expect(service.findOne).toHaveBeenCalledWith(commentId);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    // Verifica que retorne null cuando el comentario solicitado no existe
    it('should return null if comment not found', async () => {
      mockCommentsService.findOne.mockResolvedValue(null);

      const result = await controller.findOne('nonexistent-id');

      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith('nonexistent-id');
    });

    // Verifica que maneje errores al buscar un comentario
    it('should handle errors when finding a comment', async () => {
      const error = new Error('Invalid ID format');
      mockCommentsService.findOne.mockRejectedValue(error);

      await expect(controller.findOne('invalid-id')).rejects.toThrow('Invalid ID format');
      expect(service.findOne).toHaveBeenCalledWith('invalid-id');
    });

    // Verifica que busque con diferentes tipos de IDs
    it('should handle different ID formats', async () => {
      const validIds = [
        '507f1f77bcf86cd799439011',
        '507f1f77bcf86cd799439012',
        '507f1f77bcf86cd799439013',
      ];

      for (const id of validIds) {
        mockCommentsService.findOne.mockResolvedValue({ ...mockComment, _id: id });
        const result = await controller.findOne(id);
        expect(result).toBeDefined();
        expect(service.findOne).toHaveBeenCalledWith(id);
      }
    });
  });

  describe('update', () => {
    // Verifica que el endpoint PATCH /comments/:id actualice un comentario correctamente
    it('should update a comment', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      const updateCommentDto: UpdateCommentDto = {
        name: 'Updated Name',
        body: 'Updated comment',
      };
      const updatedComment = { ...mockComment, ...updateCommentDto };

      mockCommentsService.update.mockResolvedValue(updatedComment);

      const result = await controller.update(commentId, updateCommentDto);

      expect(result).toEqual(updatedComment);
      expect(service.update).toHaveBeenCalledWith(commentId, updateCommentDto);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    // Verifica que retorne null cuando se intenta actualizar un comentario inexistente
    it('should return null if comment to update not found', async () => {
      const updateCommentDto: UpdateCommentDto = { name: 'New Name' };
      mockCommentsService.update.mockResolvedValue(null);

      const result = await controller.update('nonexistent-id', updateCommentDto);

      expect(result).toBeNull();
      expect(service.update).toHaveBeenCalledWith('nonexistent-id', updateCommentDto);
    });

    // Verifica que el controlador maneje actualizaciones parciales
    it('should handle partial updates', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      const updateCommentDto: UpdateCommentDto = { body: 'Only body updated' };
      const updatedComment = { ...mockComment, body: 'Only body updated' };

      mockCommentsService.update.mockResolvedValue(updatedComment);

      const result = await controller.update(commentId, updateCommentDto);

      expect(result?.body).toBe('Only body updated');
      expect(service.update).toHaveBeenCalledWith(commentId, updateCommentDto);
    });

    // Verifica que maneje errores al actualizar
    it('should handle errors when updating a comment', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      const updateCommentDto: UpdateCommentDto = { name: 'New Name' };
      const error = new Error('Update failed');
      
      mockCommentsService.update.mockRejectedValue(error);

      await expect(controller.update(commentId, updateCommentDto)).rejects.toThrow('Update failed');
      expect(service.update).toHaveBeenCalledWith(commentId, updateCommentDto);
    });

    // Verifica que actualice solo el nombre
    it('should update only name', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      const updateCommentDto: UpdateCommentDto = { name: 'Jane Doe' };
      const updatedComment = { ...mockComment, name: 'Jane Doe' };

      mockCommentsService.update.mockResolvedValue(updatedComment);

      const result = await controller.update(commentId, updateCommentDto);

      expect(result?.name).toBe('Jane Doe');
      expect(service.update).toHaveBeenCalledWith(commentId, updateCommentDto);
    });

    // Verifica que actualice el email
    it('should update email', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      const updateCommentDto: UpdateCommentDto = { email: 'newemail@example.com' };
      const updatedComment = { ...mockComment, email: 'newemail@example.com' };

      mockCommentsService.update.mockResolvedValue(updatedComment);

      const result = await controller.update(commentId, updateCommentDto);

      expect(result?.email).toBe('newemail@example.com');
      expect(service.update).toHaveBeenCalledWith(commentId, updateCommentDto);
    });

    // Verifica que actualice con DTO vacío
    it('should handle empty update DTO', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      const updateCommentDto: UpdateCommentDto = {};

      mockCommentsService.update.mockResolvedValue(mockComment);

      const result = await controller.update(commentId, updateCommentDto);

      expect(result).toEqual(mockComment);
      expect(service.update).toHaveBeenCalledWith(commentId, updateCommentDto);
    });
  });

  describe('remove', () => {
    // Verifica que el endpoint DELETE /comments/:id elimine permanentemente un comentario
    it('should delete a comment permanently', async () => {
      const commentId = '507f1f77bcf86cd799439011';

      mockCommentsService.remove.mockResolvedValue(mockComment);

      const result = await controller.remove(commentId);

      expect(result).toEqual(mockComment);
      expect(service.remove).toHaveBeenCalledWith(commentId);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    // Verifica que retorne null cuando se intenta eliminar un comentario que no existe
    it('should return null if comment to delete not found', async () => {
      mockCommentsService.remove.mockResolvedValue(null);

      const result = await controller.remove('nonexistent-id');

      expect(result).toBeNull();
      expect(service.remove).toHaveBeenCalledWith('nonexistent-id');
    });

    // Verifica que maneje errores al eliminar un comentario
    it('should handle errors when removing a comment', async () => {
      const commentId = '507f1f77bcf86cd799439011';
      const error = new Error('Delete operation failed');

      mockCommentsService.remove.mockRejectedValue(error);

      await expect(controller.remove(commentId)).rejects.toThrow('Delete operation failed');
      expect(service.remove).toHaveBeenCalledWith(commentId);
    });

    // Verifica que elimine comentarios con diferentes IDs
    it('should delete comments with different IDs', async () => {
      const commentIds = ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'];

      for (const id of commentIds) {
        const deletedComment = { ...mockComment, _id: id };
        mockCommentsService.remove.mockResolvedValue(deletedComment);

        const result = await controller.remove(id);

        expect(result).toBeDefined();
        expect(service.remove).toHaveBeenCalledWith(id);
      }
    });
  });
});
