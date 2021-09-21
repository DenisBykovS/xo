import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {Post} from "../shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class PostService {

  constructor(private http: HttpClient) {}

  getPostAll() : Observable<Post[]> {
    return this.http.get<Post[]>('/api/post')
  }

  createPost(text: string, image: File) : Observable<Post> {
    const formData = new FormData()
    if(image) {
      formData.append('image', image, image.name)
    }
    formData.append('text', text)

    return this.http.post<Post>('/api/post',formData)
  }

  updatePost(id: string, text: string, image: File) : Observable<Post> {
    const formData = new FormData()
    if(image) {
      formData.append('image', image, image.name)
    }
    formData.append('text', text)
    return this.http.patch<Post>(`/api/post/${id}`,formData)
  }

  deletePost(id: Post)  {
    return this.http.delete(`/api/post/${id}`)
  }

  getById(id) : Observable<Post> {
    return this.http.get<Post>(`/api/post/${id}`)
  }
}
