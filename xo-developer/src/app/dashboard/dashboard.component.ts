import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../message.service";
import {Message} from "../shared/interfaces";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  sub: Subscription
  form: FormGroup;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.form = new FormGroup({
      heading: new FormControl('',  Validators.required),
      text: new FormControl("", Validators.required)
    });
  }

  messageGo() {
    const message: Message = {
      author: localStorage.getItem("user"),
      ...this.form.value}
    this.sub = this.messageService.addMessage(message).subscribe(() => {
      console.log('Сообщение отправленно')
    })
    this.form.reset()
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
}
