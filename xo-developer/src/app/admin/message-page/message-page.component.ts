import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../../shared/interfaces";
import { MessageService } from "../../message.service";

@Component({
  selector: "app-message-page",
  templateUrl: "./message-page.component.html",
  styleUrls: ["./message-page.component.scss"],
})
export class MessagePageComponent implements OnInit {
  public messages: Message[];

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getAllMessage().subscribe((message) => {
      this.messages = message;
    });
  }

  remove(id: Message) {
    this.messageService.removeMessage(id).subscribe(() => {
      this.messages = this.messages.filter((m) => m._id !== id);
    });
  }

  messageUpdate(id: Message, state) {
    this.messageService.updateOneMessage(id, state).subscribe(() => {
      this.messages.forEach((message) => {
        if (message._id === id) {
          message.important = state;
        }
      });
    });
  }
}
