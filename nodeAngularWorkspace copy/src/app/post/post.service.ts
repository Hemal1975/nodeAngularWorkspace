import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

   constructor(private httpClient: HttpClient) {} 

  getPosts() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe({
        next: (res) => {
            this.posts = res.posts;
            console.log('RES',  this.posts);
            this.postsUpdated.next([...this.posts]);
        }
    })
    // return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: '',title: title, content: content};
    this.httpClient.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe(
        (responseData) => {
            this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        }
    )
  }
}
