import { Message, SendMessageService } from './../../services/send-message-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-input',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.scss',
})
export class UserInput {

  private messageService = inject(SendMessageService)

  sendMessageForm = new FormGroup({
    numberPhone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(11)]
    }),
    principal: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

  sendMessage(): void {

    if (this.sendMessageForm.invalid) {
      return;
    }

    this.messageService.sendMessage(this.sendMessageForm.getRawValue()).subscribe({
      next: (response) => {
          console.log("Sucesso ao enviar para o backend");
      },
      error: (err) => {
          console.log("Erro ao enviar para o backend");
      }
    })

  }

}
