import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { Club } from './club.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  club!:Club[];
  baseUrl = 'http://localhost:8089/users/api/club';
  constructor(private http: HttpClient,private authService:AuthServiceService) { }
  listeClub():Observable<Club[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Club[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
  addClub(club: Club): Observable<Club> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
  
    return this.http.post<Club>(`${this.baseUrl}/add`, club, { headers: httpHeaders });
  }
  
  
  supprimerClub(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
consulterClub(id:number):Observable<Club>{

  const url = `${this.baseUrl}/update/${id}`;
  let jwt=this.authService.getToken();
  jwt="Bearer "+jwt;
  let httpHeaders=new HttpHeaders({"Authorization":jwt});

  return this.http.get<Club>(url,{headers:httpHeaders});
}
updateClub(club: Club): Observable<Club> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.put<Club>(`${this.baseUrl}/update/${club.idClub}`, club, { headers: httpHeaders });
}
rechercheParNameClub(clubName: string): Observable<Club[]> {
  const url = `${this.baseUrl}/search?name=${clubName}`;
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<Club[]>(url, { headers: httpHeaders });
}

}