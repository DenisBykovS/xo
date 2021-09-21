import { Component, OnInit } from '@angular/core';
import {PostService} from "../admin/post.service";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  posts : Post[]

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPostAll().subscribe((posts) => {
      this.posts = posts
    })
  }

}
