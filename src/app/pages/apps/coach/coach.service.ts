import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { Coach } from './coach.model';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  coach!:Coach[];
  baseUrl = 'http://localhost:8089/users/api/coach';
 
  constructor(private http: HttpClient,private authService:AuthServiceService) { }
  listeCoach():Observable<Coach[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Coach[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
  addCoach(coach: Coach): Observable<Coach> {
    // Ensure coach includes the rapport field
    console.log(coach); // Debug: Check the coach payload before sending
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json"
    });
  
    return this.http.post<Coach>(`${this.baseUrl}/add`, coach, { headers: httpHeaders });
  }
  
   
  
  supprimerCoach(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
consulterCoach(id:number):Observable<Coach>{

  const url = `${this.baseUrl}/update/${id}`;
  let jwt=this.authService.getToken();
  jwt="Bearer "+jwt;
  let httpHeaders=new HttpHeaders({"Authorization":jwt});

  return this.http.get<Coach>(url,{headers:httpHeaders});
}
updateCoach(coach: Coach): Observable<Coach> {
  // Ensure coach includes the rapport field
  console.log(coach); // Debug: Check the coach payload before updating
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({ "Authorization": `Bearer ${jwt}` });

  return this.http.put<Coach>(`${this.baseUrl}/update/${coach.idCoach}`, coach, { headers: httpHeaders });
}

rechercheParNameCoach(nameCoach: string): Observable<Coach[]> {
  const url = `${this.baseUrl}/search?name=${nameCoach}`;
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });
  return this.http.get<Coach[]>(url, { headers: httpHeaders });
}


}
