import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { User } from '../../authentication/model/login.model';
import { Role } from '../../authentication/model/Role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL:string='http://localhost:8089/users'
  constructor(private http: HttpClient,private authService:AuthServiceService) { }
role!:Role[];

  listeUser():Observable<User[]>{
    let jwt = this.authService.getToken();
    console.log("JWT Token:", jwt); // Debug: Log the JWT token
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<User[]>(this.apiURL+"/all",{headers:httpHeaders});
  }
  getAllRoles():Observable<Role[]> {
    let jwt=this.authService.getToken();
    console.log("JWT Token:", jwt); // Debug: Log the JWT token
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
     return this.http.get<Role[]>(this.apiURL + '/allRoles',{headers:httpHeaders});
  }
  // listeEvent(): Observable<Event[]> {
  //   return this.http.get<Event[]>(this.apiURL);
  // }
  
}
