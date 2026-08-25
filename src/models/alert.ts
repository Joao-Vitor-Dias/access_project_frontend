import { AlertType } from "./enums/alert-type";

export interface Alert {

  alertType: AlertType;
  message: string;
  timestamp: Date;
  data: object;

}
