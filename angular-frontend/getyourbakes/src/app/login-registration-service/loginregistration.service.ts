import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Provides the service at the root level
})
export class UserService {
  private baseUrl = 'https://qfcpayondi.execute-api.us-east-1.amazonaws.com';
  private isAuthenticated = false;
  private accessResponse: Observable<any> | null =null;
  private accessToken:any;

  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    const url = `${this.baseUrl}/create_user`;
    return this.http.post(url, userData);
  }
  confirmCode(userData: any) {
    const url = `${this.baseUrl}/verifyEmail`;
    return this.http.post(url, userData);
  }
  // login(userData: any) {
  //   const url = `${this.baseUrl}/login`;
  //   this.accesstoken = this.http.post(url, userData);

  //   this.verifyAccessToken({
  //     accesstoken:this.http.post(url, userData)
  //   })

  //   return this.http.post(url, userData);
  // }

  login(userData: any) {
    const url = `${this.baseUrl}/login`;
    this.accessResponse = this.http.post(url, userData);

    // Call verifyAccessToken method once the response is received
    this.accessResponse.subscribe(
      response => {
        this.isAuthenticated = true;
        console.log("Sss",this.isAuthenticated);
        // this.verifyAccessToken(response);
      },
      error => {
        this.isAuthenticated = false;
        console.log("Sss",this.isAuthenticated);
        // Handle error if needed
      }
    );
    console.log("Sss",this.isAuthenticated);
    return this.accessResponse;
  }
  // verifyAccessToken(response: any) {
  //   // this.accessToken = response.authenticationDetails.AuthenticationResult.AccessToken;
  //   this.accessToken = "sssswewrw";

  //   const url = `${this.baseUrl}/verifyAccessToken`;

  //   this.http.post(url, {
  //     "accessToken":this.accessToken
  //   }).subscribe(
  //     response =>{
  //       console.log(response);
  //       this.isAuthenticated = true;
  //     },
  //     error =>{
  //       this.isAuthenticated = false;
  //     }
  //   );

  // }
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  signOut(){
    console.log("cliced signout");
  }
}
