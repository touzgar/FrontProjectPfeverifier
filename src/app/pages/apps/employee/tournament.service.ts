import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { Tournament, Tournoi } from './Tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
tournament:Tournament[];
tournoi:Tournoi[];
baseUrl = 'http://localhost:8089/users/api/tournament';

  constructor(private http: HttpClient,private authService:AuthServiceService) { }

  listeTournament():Observable<Tournament[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Tournament[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
  supprimerTournament(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
// In tournament.service.ts

// In TournamentService

// In TournamentService

addTournament(tournoi: Tournoi): Observable<Tournoi> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<Tournoi>(`${this.baseUrl}/add`, tournoi,{headers} );
  
   }


consulterTournament(id:number):Observable<Tournament>{

  const url = `${this.baseUrl}/update/${id}`;
  let jwt=this.authService.getToken();
  jwt="Bearer "+jwt;
  let httpHeaders=new HttpHeaders({"Authorization":jwt});

  return this.http.get<Tournament>(url,{headers:httpHeaders});
}
updateTournament(tournament: Tournament): Observable<Tournament> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.put<Tournament>(`${this.baseUrl}/update/${tournament.idTournament}`, tournament, { headers: httpHeaders });
}
addTeamsToTournament(tournamentName: string, teamNames: string[]): Observable<any> {
  const jwt = this.authService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  // Construct query parameters manually if necessary
  let queryParams = `tournamentName=${encodeURIComponent(tournamentName)}&teamNames=${encodeURIComponent(teamNames.join(','))}`;

  // Use the full URL with query parameters
  const url = `${this.baseUrl}/registerTeams?${queryParams}`;

  return this.http.post<any>(url, {}, { headers });
}
removeTeamsFromTournament(tournamentName: string, teamNames: string[]): Observable<any> {
  const jwt = this.authService.getToken();
  const httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  const params = new HttpParams()
    .set('tournamentName', tournamentName)
    .set('teamNames', teamNames.join(',')); // Convert array to comma-separated string

  return this.http.delete(`${this.baseUrl}/removeTeams`, { headers: httpHeaders, params });
}
getHistoricalTournament(): Observable<Tournament[]> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  const httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.get<Tournament[]>(`${this.baseUrl}/historical`, { headers: httpHeaders });
}
rechercheParNameTournament(tournamentName: string): Observable<Tournament[]> {
  const url = `${this.baseUrl}/search?name=${tournamentName}`;
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<Tournament[]>(url, { headers: httpHeaders });
}


 
}
