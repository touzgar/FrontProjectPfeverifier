import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { AchievementPlayer } from './achivementPlayer.model';

@Injectable({
  providedIn: 'root'
})
export class AchivementPlayerService {
achivementPlayer:AchievementPlayer[];
baseUrl = 'http://localhost:8089/users/api/achievementPlayer';

  constructor(private http: HttpClient,private authService:AuthServiceService) { }

  
  listeAchivementsPlayer():Observable<AchievementPlayer[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<AchievementPlayer[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }

  supprimeAchivementsPlayer(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
// Inside AchivementPlayerService
// In achivement-player.service.ts
consulterCoach(id:number):Observable<AchievementPlayer>{

  const url = `${this.baseUrl}/update/${id}`;
  let jwt=this.authService.getToken();
  jwt="Bearer "+jwt;
  let httpHeaders=new HttpHeaders({"Authorization":jwt});

  return this.http.get<AchievementPlayer>(url,{headers:httpHeaders});
}
updateAchievementPlayer(id: number, achievementPlayerData: AchievementPlayer): Observable<AchievementPlayer> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  // If necessary, convert other fields like 'trophie' to the expected format
  if (typeof achievementPlayerData.trophie === 'string') {
    achievementPlayerData.trophie = [achievementPlayerData.trophie];
  }

  const url = `${this.baseUrl}/update/${id}`;
  return this.http.put<AchievementPlayer>(url, achievementPlayerData, { headers: httpHeaders });
}

// In achivement-player.service.ts

// Add method to create AchievementPlayer
addAchivement(achivement: AchievementPlayer): Observable<AchievementPlayer> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.post<AchievementPlayer>(`${this.baseUrl}/add`, achivement, { headers: httpHeaders });
}

rechercheParNameAchivementPlayer(playerName: string): Observable<AchievementPlayer[]> {
  const url = `${this.baseUrl}/search?name=${playerName}`;
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<AchievementPlayer[]>(url, { headers: httpHeaders });
}


}
