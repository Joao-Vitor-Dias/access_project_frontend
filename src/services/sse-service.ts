import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { executeSchedule } from 'rxjs/internal/util/executeSchedule';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root',
})
export class SseService {

  constructor(private zone: NgZone) {}


  url: string = "http://localhost:8080/notifications/subscribe";

  connect(): Observable<any>{

    return new Observable(observer => {

      const eventSource = new EventSource(this.url);

      eventSource.onmessage = (event) => {

        const alert: Alert = JSON.parse(event.data);

        this.zone.run(() => {

          observer.next(alert);

        })

        console.log("Conectado com sucesso")

      }

      eventSource.onerror = (error => {

        console.log("Deu erro para falar com o backend")
        console.log(error)

      });


    });

  }

}
