import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { Session } from './session.model';


@Injectable({
  providedIn: 'root'
})


export class SessionService {
session:Session[];
baseUrl = 'http://localhost:8089/users/api/session';

  constructor(private http:HttpClient, private authService:AuthServiceService) { }
  listeSession():Observable<Session[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Session[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
  supprimerSession(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
updateSession(id: number, sessionData: Session): Observable<Session> {
  const url = `${this.baseUrl}/update/${id}`;
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  // No change is needed here if the Session object is already in the right structure
  return this.http.put<Session>(url, sessionData, { headers });
}

addSession(sessionData: any): Observable<any> {
  const headers = this.getHeaders();
  // Assuming the structure matches the backend expectations
  return this.http.post<any>(`${this.baseUrl}/add`, sessionData, { headers });
}

// Helper method to construct headers
private getHeaders(): HttpHeaders {
  let jwt = this.authService.getToken();
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwt}`
  });
}

rechercheParNameSession(sessionName: string): Observable<Session[]> {
  const url = `${this.baseUrl}/search?name=${sessionName}`;
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<Session[]>(url, { headers: httpHeaders });
}

}
