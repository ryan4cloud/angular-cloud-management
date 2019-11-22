import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = 'http://localhost:5000';

  login(loginPayload: any) {
    const headers = {
      'Authorization': 'Basic ' + btoa('browser:'),
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    return this.httpClient.post(this.baseUrl + '/uaa/oauth/token', loginPayload, {
      headers: new HttpHeaders(headers),
      withCredentials: true
    });
  }

  logout(payload: any) {
    const headers = {
      'Authorization': 'Basic ' + btoa('browser:'),
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    return this.httpClient.delete(this.baseUrl + '/uaa/oauth/token', {
      headers: new HttpHeaders(headers),
      params: payload,
      withCredentials: true
    });
  }

}
