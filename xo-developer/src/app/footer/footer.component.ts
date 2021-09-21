import { Component, OnInit } from '@angular/core';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit() {
  }

  toTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
