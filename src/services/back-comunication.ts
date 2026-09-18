import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackComunication {

  private http = inject(HttpClient);

  private url = "http://localhost:8080/v2/message"

  getQrCode(): Observable<Blob>{

    return this.http.get(this.url + "/qr", {
      responseType: 'blob'
    });

  }

  getScreenshot(): Observable<Blob>{

    return this.http.get(this.url + "/print", {
      responseType: 'blob'
    });

  }

  getTryConnection(path:string): Observable<void>{

      return this.http.get<void>(this.url + path);

  }

}
