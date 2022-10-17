import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Client {
  email: string;
  address: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gotcha-frontend';
  panelOpenState = false;
  clientEndpointUrl = "https://gotcha-backend.herokuapp.com/api/add";
  // private corsHeaders: HttpHeaders;


  constructor(
    private http: HttpClient
  ) {
    // this.corsHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
  }

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict),
    withCredentials: true
  };
  

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  addressFormControl = new FormControl('', [
    Validators.required,
  ]);

  // getContent(subs: Array<string>): Observable<IContent> {
  //   return (() => {
  //     return this.http.get<IContent>( (() => {
  //       let r = this.root;
  //       subs.forEach((s, i, a) => {
  //         if(i === a.length-1) {
  //           r += s;
  //         }
  //         else {
  //           if(s !== '/') {
  //             r += s;
  //           }
  //         }
  //       });
  //       return r;
  //     })(), {
  //       headers: this.corsHeaders
  //     });

  //   })();
  // }


  newClient(_email: string, _address: string) {

    const newClientObj: Client = {
      email: _email,
      address: _address
    };

    console.log("object to send: ", newClientObj)

    //     this.http.post<Client>(this.clientEndpointUrl, newClientObj, { withCredentials: true })


    this.http.post<Client>(this.clientEndpointUrl, newClientObj, this.requestOptions)
      .pipe(
        catchError(error => {
          console.log('Sending data failed')
          return throwError(() => new Error('error occured'))
        })
      ).subscribe(newClientObj => console.log("new client added: ", newClientObj))
  }

}
