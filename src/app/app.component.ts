import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
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

  constructor(
    private http: HttpClient
  ) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  addressFormControl = new FormControl('', [
    Validators.required,
  ]);


  newClient(_email: string, _address: string) {

    const newClientObj: Client = {
      email: _email,
      address: _address
    };

    console.log("object to send: ", newClientObj)

    this.http.post<Client>(this.clientEndpointUrl, newClientObj, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.log('Sending data failed')
          return throwError(() => new Error('error occured'))
        })
      ).subscribe(newClientObj => console.log("new client added: ", newClientObj))
  }

}
