import { Defi } from "../defi/defi.model";
import { Team } from "../team/team.model";

// tournament.model.ts

export class Tournament {
    idTournament?: number;
    tournamentName: string;
    dateStart: string; // ISO string format
    dateEnd: string; // ISO string format
    format: string;
    prizePool: number;
    status: boolean;
    capacity: number;
    // Other properties as required by your backend
    teamName:String;
    teams: Team[];
    matchName:string;
    defis:Defi[];
}
export class Tournoi{
    idTournament?: number;
    tournamentName: string;
    dateStart: string; // ISO string format
    dateEnd: string; // ISO string format
    format: string;
    prizePool: number;
    status: boolean;
    capacity: number;
    
}