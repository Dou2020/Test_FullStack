import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Post as PostModel } from '../model/post.model';

@Injectable({
  providedIn: 'root',
})
export class Post {

  private apiUrl = process.env['URL'] + '/posts';
  
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostModel[]> {
    try {
      return this.http.get<PostModel[]>(this.apiUrl);
    } catch (error) {
      throw new Error('Error fetching posts');
    }
  }

  getPostById(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.apiUrl}/${id}`);
  }

  createPost(post: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.apiUrl, post);
  }

  updatePost(id: string, post: PostModel): Observable<PostModel> {
    return this.http.put<PostModel>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}
