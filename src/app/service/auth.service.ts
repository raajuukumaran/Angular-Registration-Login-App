import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/user';

  GetAll() {
    return this.http.get(this.apiurl);
  }

  GetByCode(code: string) {
    return this.http.get(`${this.apiurl}/${code}`);
  }

  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  proceedregister(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }

  Updateuser(code: string, inputdata: any) {
    return this.http.put(`${this.apiurl}/${code}`, inputdata);  // Changed to PUT
  }

  IsLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  GetUserrole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }
}
