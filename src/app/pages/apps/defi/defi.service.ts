import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { Defi } from './defi.model';

@Injectable({
  providedIn: 'root'
})
export class DefiService {
  baseUrl = 'http://localhost:8089/users/api/defi';
  apiUrl = 'http://localhost:8089/users/api/tournament';

  defi!:Defi[];
  constructor(private http: HttpClient,private authService:AuthServiceService) { }


  listeDefi():Observable<Defi[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Defi[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
  consulterDefi(id:number):Observable<Defi>{

    const url = `${this.baseUrl}/update/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  
    return this.http.get<Defi>(url,{headers:httpHeaders});
  }
  updateDefi(defi: Defi): Observable<Defi> {
    const formattedDateStart = formatDate(defi.dateStart, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
    const updatedDefi = { ...defi, dateStart: formattedDateStart };
  
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
  
    return this.http.put<Defi>(`${this.baseUrl}/update/${defi.idMatch}`, updatedDefi, { headers: httpHeaders });
  }
  supprimerDefi(id:number){
    const url=`${this.apiUrl}/deleteMatchFromTournament/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}

addMatchToTournament(payload: { tournamentName: string; matchDescription: string; matchDateTime: string }): Observable<any> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  const httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.post(`${this.apiUrl}/addMatch`, payload, { headers: httpHeaders });
}

rechercheParNameMatch(matchName: string): Observable<Defi[]> {
  const url = `${this.baseUrl}/search?name=${matchName}`;
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<Defi[]>(url, { headers: httpHeaders });
}
getHistoricalMatches(): Observable<Defi[]> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  const httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.get<Defi[]>(`${this.baseUrl}/historical`, { headers: httpHeaders });
}







  }
