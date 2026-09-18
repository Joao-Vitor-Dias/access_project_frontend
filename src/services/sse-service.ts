import { Injectable, NgZone, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert';
import { AlertType } from '../models/enums/alert-type';

@Injectable({
  providedIn: 'root',
})
export class SseService {

  url: string = "http://localhost:8080/notifications/subscribe";
  currentAlert = signal<Alert | null>(null);

  constructor(private zone: NgZone) {}

  connect(): Observable<any>{

    return new Observable(observer => {

      const eventSource = new EventSource(this.url);

      eventSource.onmessage = (event) => {

        const alert: Alert = JSON.parse(event.data);

        this.zone.run(() => {

          observer.next(alert);
          this.currentAlert.set(alert);

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
