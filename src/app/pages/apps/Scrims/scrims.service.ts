import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { Scrims } from './Scrims.model';

@Injectable({
  providedIn: 'root'
})
export class ScrimsService {
scrim:Scrims[];
baseUrl = 'http://localhost:8089/users/api/scrims';
  constructor(private http:HttpClient,private authService:AuthServiceService) { }
  listeScrims():Observable<Scrims[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Scrims[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
  supprimerScrims(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
// Within ScrimsService
updateScrims(id: number, scrimsData: Scrims): Observable<Scrims> {
  const url = `${this.baseUrl}/update/${id}`;
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  // No change is needed here if the Session object is already in the right structure
  return this.http.put<Scrims>(url, scrimsData, { headers });
}
addScrims(scrimsData: any): Observable<any> {
  const headers = this.getHeaders();
  // Assuming the structure matches the backend expectations
  return this.http.post<any>(`${this.baseUrl}/add`, scrimsData, { headers });
}

// Helper method to construct headers
private getHeaders(): HttpHeaders {
  let jwt = this.authService.getToken();
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwt}`
  });
}


}
