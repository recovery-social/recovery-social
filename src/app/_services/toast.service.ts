import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

export class ToastTypes {
  static show = "show";
  static info = "info";
  static success = "success";
  static error = "error";
  static warning = "warning";
}

@Injectable({
  providedIn: "root",
})
export class ToastService {
  protected parentOptions = {
    position: "topCenter",
  };

  constructor(public toastr: ToastrService) { }

  success(title: string, message?: string) {
    this.toastr.success(message , title);
  }

  info(title: string, message?: string) {
    this.toastr.info(message , title);
  }

  error(title: string, message?: string) {
    this.toastr.error(message , title);
  }

  warning(title: string, message?: string) {
    this.toastr.warning(message , title);
  }
}
