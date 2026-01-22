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

  
}
