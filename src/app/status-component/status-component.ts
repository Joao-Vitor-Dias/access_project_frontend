import { Component, inject, Input } from '@angular/core';
import { StatusCard } from "./status-card/status-card";
import { MatIcon } from "@angular/material/icon";
import { ImageMenu } from '../image-menu/image-menu';
import { BackComunication } from '../../services/back-comunication';

@Component({
  selector: 'app-status-component',
  imports: [StatusCard, MatIcon,ImageMenu],
  templateUrl: './status-component.html',
  styleUrl: './status-component.scss',
})
export class StatusComponent {

  @Input()
  open = false;

  private backServiceCall = inject(BackComunication);

  nameDriverPlaceHolher = "Conexão do Driver";
  nameWhatsappPlaceHoler = "Conxão do Whatsapp";

  closeWhatsappPopup = () => {

    this.backServiceCall.getTryConnection("/close/popup")
      .subscribe();

  }

  tryConnectionDrive = () => {

    this.backServiceCall.getTryConnection("/connect")
      .subscribe();

  }

  disconnectDrive = () => {

    this.backServiceCall.getTryConnection("/disconnect")
      .subscribe();

  }

}
