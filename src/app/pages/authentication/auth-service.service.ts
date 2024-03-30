import { Injectable } from '@angular/core';
import { User } from './model/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public loggedUser: string = '';
  public isloggedIn: boolean = false;
  public roles: string[] = [];
  apiURL:string='http://localhost:8089/users';
  token!:string;
  private helper =new JwtHelperService();
  public regitredUser:User=new User();
  constructor(private router: Router,private http:HttpClient) { }
  login(user:User){
    return this.http.post<User>(this.apiURL+'/login',user,{observe:'response'});
  }
  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token=jwt;
    this.isloggedIn=true;
    this.decodeJWT();
  }
  loadToken(){
    this.token=localStorage.getItem('jwt')!;
    this.decodeJWT();
  }
  decodeJWT(){
    if(this.token==undefined)
    return;
    const decodedToken=this.helper.decodeToken(this.token);
    this.roles=decodedToken.roles;
    console.log("roles"+this.roles);
    this.loggedUser=decodedToken.sub;
  
  }

  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token=undefined!;
   localStorage.removeItem("jwt");
    this.router.navigate(['/login']);
  }
  isTokenExpired():Boolean{
    return this.helper.isTokenExpired(this.token);
  }
  getToken():string{
    return this.token;
  }

  isAdmin():Boolean{
    if(!this.roles)
    return false;
    return this.roles.indexOf('ADMIN')>=0;
  }
  setLoggedUserFromLocalStorage(login:string){
    this.loggedUser = login;
    this.isloggedIn=true;
  }
registerUser(user :User){
  return this.http.post<User>(this.apiURL+'/register',user,{observe:'response'});
}

setRegistredUser(user:User){
this.regitredUser=user;
}
getRegistredUser(){
  return this.regitredUser;
}
validateEmail(code:string){
  return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
}
// Method to call the backend endpoint
// If your backend expects form data, you might need to adjust this:
forgotPassword(email: string): Observable<any> {
  const formData = new FormData();
  formData.append('email', email);
  return this.http.post(`${this.apiURL}/forgot-password`, formData);
}
resetPassword(token: string, newPassword: string): Observable<any> {
  return this.http.post(`${this.apiURL}/reset-password`, { token, password: newPassword });
}




}
