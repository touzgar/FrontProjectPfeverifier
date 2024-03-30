import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { ContractPlayer } from './ContractPlayer.model';

@Injectable({
  providedIn: 'root'
})
export class ContractPlayerService {
contractPlayer:ContractPlayer[];
baseUrl = 'http://localhost:8089/users/api/contractPlayer';
  constructor(private http: HttpClient,private authService:AuthServiceService) { }

  listeContractPlayer():Observable<ContractPlayer[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<ContractPlayer[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
  supprimerContractPlayer(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
consulterContractPlayer(id:number):Observable<ContractPlayer>{

  const url = `${this.baseUrl}/update/${id}`;
  let jwt=this.authService.getToken();
  jwt="Bearer "+jwt;
  let httpHeaders=new HttpHeaders({"Authorization":jwt});

  return this.http.get<ContractPlayer>(url,{headers:httpHeaders});
}
updateContractPlayer(id: number, ContractPlayerData: ContractPlayer): Observable<ContractPlayer> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  // If necessary, convert other fields like 'trophie' to the expected format
  if (typeof ContractPlayerData.objectifs === 'string') {
    ContractPlayerData.objectifs = [ContractPlayerData.objectifs];
  }

  const url = `${this.baseUrl}/update/${id}`;
  return this.http.put<ContractPlayer>(url, ContractPlayerData, { headers: httpHeaders });
}

// In ContractPlayerService

addContractPlayer(contractPlayer: ContractPlayer): Observable<ContractPlayer> {
  const jwt = "Bearer " + this.authService.getToken();
  const httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.post<ContractPlayer>(`${this.baseUrl}/add`, contractPlayer, { headers: httpHeaders });
}

rechercheParNameContractPlayer(playerName: string): Observable<ContractPlayer[]> {
  const url = `${this.baseUrl}/search?name=${playerName}`;
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<ContractPlayer[]>(url, { headers: httpHeaders });
}


}
