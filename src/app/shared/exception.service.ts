import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ToastService } from './toast/toast.service';

@Injectable()
export class ExceptionService {

  constructor(private _toastService: ToastService) { }

  catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    let res = errorResponse as Response;
    let err = res.json();
    let emsg = err ?
      (err.error ? err.error : JSON.stringify(err)) :
      (res.statusText || 'unknown error');
    this._toastService.activate(`Error - Bad Response - ${emsg}`);
    // return Observable.throw(emsg); 
    // TODO: We should NOT swallow error here.
    return Observable.of();
  }
}
