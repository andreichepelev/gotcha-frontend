import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _snackBar: MatSnackBar,
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

  openSnackBar() {
    this._snackBar.open('Your email and address are added to the database, you can test Gotcha on Goerli', 'Got it', {
      duration: 7000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  newClient(_email: string, _address: string) {

    const newClientObj: Client = { 
      email: _email,
      address: _address
    };

    console.log("object to send: ", newClientObj)

    this.http.post<Client>(this.clientEndpointUrl, newClientObj, this.requestOptions)
      .pipe(
        catchError(error => {
          console.log('Sending data failed')
          return throwError(() => new Error('error occured'))
        })
      ).subscribe(newClientObj => console.log("new client added: ", newClientObj))

      this.openSnackBar()
      this.emailFormControl.reset()
      this.addressFormControl.reset()
  }

}
