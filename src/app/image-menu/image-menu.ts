import { BackComunication } from './../../services/back-comunication';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-image-menu',
  imports: [MatIcon],
  templateUrl: './image-menu.html',
  styleUrl: './image-menu.scss',
})
export class ImageMenu {

  @Output()
  closeMenu = new EventEmitter<void>();

  qrCodeUrl: string | null = null;

  constructor(private backServiceCall: BackComunication, private cdr: ChangeDetectorRef){}

  fechar(): void {
    this.closeMenu.emit();
  }

  getQrCode(): void {
    console.log('1 - chamou getQrCode()');


    this.backServiceCall.getQrCode().subscribe({
      next: (image: Blob) => {
        console.log('2 - recebeu imagem');
        console.log('Blob:', image);
        console.log('Size:', image.size);
        console.log('Type:', image.type);

        if (this.qrCodeUrl) {
          URL.revokeObjectURL(this.qrCodeUrl);
        }

        this.qrCodeUrl = URL.createObjectURL(image);

        console.log('3 - qrCodeUrl:', this.qrCodeUrl);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Erro ao buscar QR Code:', error);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.qrCodeUrl) {
      URL.revokeObjectURL(this.qrCodeUrl);
    }
  }

}
