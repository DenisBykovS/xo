import { Component, OnInit } from '@angular/core';
import {Post} from "../../shared/interfaces";
import {PostService} from "../post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  posts : Post[]

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.postService.getPostAll().subscribe((posts) => {
      this.posts = posts
    })
  }

  removePost(id: Post) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(p => p._id !== id)
    })
  }
}
