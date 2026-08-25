import { AlertType } from './../../models/enums/alert-type';
import { Alert } from './../../models/alert';
import { Component, OnInit, signal } from '@angular/core';
import { SseService } from '../../services/sse-service';
import { Subscription } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { AlertResponse } from './models/alert-response';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, NgClass],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {

  alerts = signal<Alert[]>([]);

  currentAlert = signal<AlertResponse | null>(null);

  private subscription?: Subscription;

  mockAlert: Alert = {
    alertType: AlertType.TRY_CONNECT_DRIVE,
    timestamp: new Date ('2026-07-15T14:30:45.123'),
    message: 'Mensagem de teste .... mock:',
    data: {
      'phone': '19997641308',
      'message': 'Oi ... você está bem?'
    }
  }

  constructor(private sseService: SseService){}

  ngOnInit(): void{

    this.subscription = this.sseService
      .connect()
      .subscribe({
        next: alert => {
          console.log("Pegou a mensagem");
          // salva em algum lugar para persistir em tempo de execução
          // this.currentAlert.set(alert)
          this.currentAlert.set(new AlertResponse(alert))
          this.alerts.update(alerts => [...alerts, alert]);
        }
      })

  }

  getColorType(alertGenericType : string| undefined): string{

    switch(alertGenericType){
      case 'SUCCESSFUL':
        return 'successful';
      case 'FAILURE':
        return 'failure';
      case 'TRY':
        return 'try';
      default:
        return 'undefined';

    }

  }

}
