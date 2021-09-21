import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {Message} from "./shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class MessageService {

  constructor(private http: HttpClient) {}

  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`/api/message`, message)
  }

  getAllMessage(): Observable<Message[]> {
    return this.http.get<Message[]>('/api/message')
  }

  removeMessage(id: Message) {
    return this.http.delete(`/api/message/${id}`)
  }
  updateOneMessage(id: Message, state) {
    return this.http.patch(`/api/message/${id}`,{important: state})
  }
}
