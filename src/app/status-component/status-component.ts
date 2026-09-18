import { Component, Input } from '@angular/core';
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

  nameDriverPlaceHolher = "Conexão do Driver";
  nameWhatsappPlaceHoler = "Conxão do Whatsapp";

  constructor(private backServiceCall: BackComunication){}

  tryConnectionWhatsapp(){
    console.log("Tentando conexão whatsapp")

  }

  tryConnectionDrive(){
    console.log("Tentando conexão driver")

  }

}
