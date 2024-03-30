import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { AchievementTeam } from './AchivementTeam.model';

@Injectable({
  providedIn: 'root'
})
export class AchivementTeamService {
  achivementTeam:AchievementTeam[];
  baseUrl = 'http://localhost:8089/users/api/achivementTeam';
  constructor(private http: HttpClient,private authService:AuthServiceService) { }

  listeAchievementTeam():Observable<AchievementTeam[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<AchievementTeam[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
 // Inside your AchivementTeamService class

addAchievementTeam(achievementTeam: AchievementTeam): Observable<AchievementTeam> {
  let jwt = this.authService.getToken();
  const httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<AchievementTeam>(`${this.baseUrl}/add`, achievementTeam, { headers: httpHeaders });
}
 
  supprimerAchievementTeam(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
consulterAchievementTeam(id:number):Observable<AchievementTeam>{

  const url = `${this.baseUrl}/update/${id}`;
  let jwt=this.authService.getToken();
  jwt="Bearer "+jwt;
  let httpHeaders=new HttpHeaders({"Authorization":jwt});

  return this.http.get<AchievementTeam>(url,{headers:httpHeaders});
}
updateAchievementTeam(achievementTeam: AchievementTeam): Observable<AchievementTeam> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.put<AchievementTeam>(`${this.baseUrl}/update/${achievementTeam.idAchivementsTeam}`, achievementTeam, { headers: httpHeaders });
}
}
