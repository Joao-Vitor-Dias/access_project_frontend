import { Alert } from './../../../models/alert';
import { Constructor } from './../../../../node_modules/@angular/cdk/schematics/update-tool/migration.d';
import { AlertType } from "../../../models/enums/alert-type";

export class AlertResponse {

  alertType?: AlertType;
  message?: string;
  timestamp?: string;
  data?: object;
  genericType?: 'TRY'| 'SUCCESSFUL'| 'FAILURE';

  constructor(alert: Alert){

    this.alertType = alert.alertType;
    this.message = alert.message;

    // Padronização timestamp para o response
    const date = new Date(alert.timestamp);

    const d = String(date.getDay()).padStart(2, '0');
    const m = String(date.getMonth()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');

    this.timestamp =`${d}/${m} ${h}:${min}:${s}`;

    this.data = alert.data;

    // Logica para adicionar o simplificado
    if(alert.alertType.includes('TRY')){

      this.genericType = 'TRY';

    } else if (alert.alertType.includes('SUCCESSFUL')){

      this.genericType = 'SUCCESSFUL';

    } else {

      this.genericType = 'FAILURE';

    }

  }

}
