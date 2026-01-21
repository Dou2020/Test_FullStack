import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';


@Injectable()
export class PostsService {

  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

  create(createPostDto: CreatePostDto) {
    const createdPost = new this.postModel(createPostDto);
    createdPost.save();
    return createdPost;
  }

  findAll() {
    return this.postModel.find({ deleteAt: { $exists: false } }).exec();
  }

  findOne(id: string) {
    return this.postModel.findOne({ _id: id, deleteAt: { $exists: false } }).exec();
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.postModel.findByIdAndUpdate(id, { deleteAt: new Date() }, { new: true }).exec();
  }

  bulkCreate(createPostsDto: CreatePostDto[]) {
    return this.postModel.insertMany(createPostsDto);
  }
}
