import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {

  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) {}

  create(createCommentDto: CreateCommentDto) {
    const createdComment = new this.commentModel(createCommentDto);
    createdComment.save();
    return createdComment;
  }

  findAll() {
    return this.commentModel.find({ deleteAt: { $exists: false } }).exec();
  }

  findOne(id: string) {
    return this.commentModel.findOne({ _id: id, deleteAt: { $exists: false } }).exec();
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
