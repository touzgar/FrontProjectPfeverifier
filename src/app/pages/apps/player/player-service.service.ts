import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { Player } from './player';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {
  // event!: Event[];
  player!:Player[];
  baseUrl = 'http://localhost:8089/users/api/player';
  constructor(private http: HttpClient,private authService:AuthServiceService) { }

 
  listePlayer():Observable<Player[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Player[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
  addPlayer(player: Player): Observable<Player> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
  
    return this.http.post<Player>(`${this.baseUrl}/add`, player, { headers: httpHeaders });
  }
  
  
  supprimerPlayer(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
consulterPlayer(id:number):Observable<Player>{

  const url = `${this.baseUrl}/update/${id}`;
  let jwt=this.authService.getToken();
  jwt="Bearer "+jwt;
  let httpHeaders=new HttpHeaders({"Authorization":jwt});

  return this.http.get<Player>(url,{headers:httpHeaders});
}
updatePlayer(player: Player): Observable<Player> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.put<Player>(`${this.baseUrl}/update/${player.idPlayer}`, player, { headers: httpHeaders });
}
rechercheParNamePlayer(playerName: string): Observable<Player[]> {
  const url = `${this.baseUrl}/search?name=${playerName}`;
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<Player[]>(url, { headers: httpHeaders });
}
  
}
