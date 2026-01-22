import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a message when creating a comment', () => {
      const createCommentDto: CreateCommentDto = {
        // Add properties based on your DTO
      } as CreateCommentDto;

      const result = service.create(createCommentDto);
      expect(result).toBe('This action adds a new comment');
    });
  });

  describe('findAll', () => {
    it('should return a message for all comments', () => {
      const result = service.findAll();
      expect(result).toBe('This action returns all comments');
    });
  });

  describe('findOne', () => {
    it('should return a message for a specific comment', () => {
      const commentId = 1;
      const result = service.findOne(commentId);
      expect(result).toBe(`This action returns a #${commentId} comment`);
    });

    it('should handle different comment IDs', () => {
      const commentId = 42;
      const result = service.findOne(commentId);
      expect(result).toBe(`This action returns a #${commentId} comment`);
    });
  });

  describe('update', () => {
    it('should return a message when updating a comment', () => {
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = {
        // Add properties based on your DTO
      } as UpdateCommentDto;

      const result = service.update(commentId, updateCommentDto);
      expect(result).toBe(`This action updates a #${commentId} comment`);
    });

    it('should handle different comment IDs for update', () => {
      const commentId = 99;
      const updateCommentDto: UpdateCommentDto = {} as UpdateCommentDto;

      const result = service.update(commentId, updateCommentDto);
      expect(result).toBe(`This action updates a #${commentId} comment`);
    });
  });

  describe('remove', () => {
    it('should return a message when removing a comment', () => {
      const commentId = 1;
      const result = service.remove(commentId);
      expect(result).toBe(`This action removes a #${commentId} comment`);
    });

    it('should handle different comment IDs for removal', () => {
      const commentId = 77;
      const result = service.remove(commentId);
      expect(result).toBe(`This action removes a #${commentId} comment`);
    });
  });
});
