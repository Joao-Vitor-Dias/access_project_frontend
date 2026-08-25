import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Message{

  numberPhone: string,
  principal: string

}

@Injectable({
  providedIn: 'root',
})
export class SendMessageService {

  private http = inject(HttpClient);

  private url = "http://localhost:8080/v2/message"

  sendMessage(message: Message): Observable<void>{

    return this.http.post<void>(this.url + "/send", message);

  }

}
