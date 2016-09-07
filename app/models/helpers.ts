export interface AlertInterface {
  type:string;
  message:string;
  dismissible:boolean;
}

export class Alert implements AlertInterface {
  type:string;
  message:string;
  dismissible:boolean;

  constructor (type:string = 'warning', message:string, dismissible:boolean = false) {
    this.type = type;
    this.message = message;
    this.dismissible = dismissible;
  }
}

export interface SettingMenuInterface {
  title:string;
  icon:string;
  is_selected: boolean;
  scenario:string;
}

export interface LoginFields {
  login:string;
  pw:string;
}