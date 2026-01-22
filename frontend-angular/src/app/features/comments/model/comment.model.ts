export interface Comment {
  _id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  deleteAt?: Date;
}

export interface CreateCommentRequest {
  postId: string;
  name: string;
  email: string;
  body: string;
}

export interface UpdateCommentRequest {
  name?: string;
  email?: string;
  body?: string;
}