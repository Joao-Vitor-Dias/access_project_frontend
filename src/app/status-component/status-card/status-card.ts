import { BackComunication } from './../../../services/back-comunication';
import { Component, computed, effect, Input, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SseService } from '../../../services/sse-service';
import { AlertType } from '../../../models/enums/alert-type';

@Component({
  selector: 'app-status-card',
  imports: [MatIcon],
  templateUrl: './status-card.html',
  styleUrl: './status-card.scss',
})
export class StatusCard {

  @Input()
  name!: string;

  @Input()
  functionConnection!: () => void;

  @Input()
  functionDisconnection!: () => void;

  @Input()
  alertEnumPlaceHolder!: string;

  @Input()
  isButtonConnectWorking!: boolean;

  @Input()
  isButtonDisconnectWorking!: boolean;

  isClosedConnection = signal<boolean>(true);
  successPlaceHolder = "SUCCESSFUL";
  disconnectPlaceHolder = "DISCONNECT";
  connectPlaceHoler ="CONNECT";
  closePlaceHolder = "CLOSE";


  constructor(private sseService: SseService) {

    effect(() => {

      const alert = this.sseService.currentAlert();

      if (!alert?.alertType) {
        return;
      }

      const alertType = alert.alertType;

      if(alertType.includes("DRIVER") && alertType.includes(this.disconnectPlaceHolder)){

        this.isClosedConnection.set(true);
        return;

      }

      if(this.alertEnumPlaceHolder === "WHATSAPP" && alert.message.includes("Popup") && alertType.includes(this.successPlaceHolder)){

        this.isClosedConnection.set(false);
        return;

      }

      if(alertType.includes(this.alertEnumPlaceHolder)){

        if(alertType.includes(this.successPlaceHolder) && alertType.includes(this.connectPlaceHoler)){

          this.isClosedConnection.set(false);
          return;

        }

        if(alertType.includes(this.closePlaceHolder) && alertType.includes(this.successPlaceHolder)){

          this.isClosedConnection.set(true);
          return;
        }

      }else{
        return;
      }

    });

  }

}
