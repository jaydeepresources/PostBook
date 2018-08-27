import { Post } from './Post';
import { Component } from '@angular/core';

import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  posts: any[]
  newPost: Post
  progressFlag: boolean
  successFlag: boolean
  errorFlag: boolean
  addFlag: boolean
  status: any

  constructor(public http: Http) {
    this.progressFlag = true
    this.addFlag = false
    this.successFlag = false
    this.errorFlag = false
    this.getAllPosts()
    this.newPost = new Post()
  }

  getAllPosts() {
    this.http.get('http://localhost:8090/posts/all')
      .subscribe((res: any) => {
        res = res.json()
        this.posts = res
        this.progressFlag = false
      })
  }

  addPost(postForm) {
    this.addFlag = true
    this.http.post('http://localhost:8090/posts/add', this.newPost)
      .subscribe((res: any) => {
        res = res.json()
        this.status = res
        if (this.status.queryStatus) {
          this.successFlag = true
          postForm.form.markAsPristine()
          this.newPost = new Post()
          setTimeout(() => {
            this.successFlag = false
          }, 2000);
        }
        else
          this.errorFlag = true

        this.addFlag = false
      })
  }

  deletePost(id,i) {
    this.http.delete('http://localhost:8090/posts/delete/' + id)
      .subscribe((res: any) => {
        res = res.json()
        if (res.queryStatus) {
          this.posts.splice(i,1)
        }
      })
  }

}
