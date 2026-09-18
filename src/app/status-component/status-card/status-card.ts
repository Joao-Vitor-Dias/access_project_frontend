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
  alertEnumPlaceHolder!: string;

  isClosedConnection = signal<boolean>(true);
  successPlaceHolder = "SUCCESSFUL";
  closePlaceHolder = "CLOSE"


  constructor(private sseService: SseService) {

    effect(() => {

      const alert = this.sseService.currentAlert();

      if (!alert?.alertType) {
        return;
      }

      const alertType = alert.alertType;

      if(alertType.includes(this.alertEnumPlaceHolder)){

        if(alertType.includes(this.successPlaceHolder)){

          this.isClosedConnection.set(false);
          return;
        }

        if(alertType.includes(this.closePlaceHolder)){

          this.isClosedConnection.set(true);
          return;
        }

      }else{
        return;
      }

    });

  }


}
