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

  mockAlert: AlertResponse = {
    alertType: AlertType.FIRST_LOG,
    message: 'Seja bem vindo ao sistema interno para envio de mensagens',
    data: {
      'phone': '000000000000',
      'message': 'Seja bem vindo ao sistema interno para envio de mensagens'
    },
    genericType: 'SUCCESSFUL',
    timestamp: '00000000000000'
  }

  constructor(private sseService: SseService){}

  ngOnInit(): void{

    this.currentAlert.set(this.mockAlert);

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
