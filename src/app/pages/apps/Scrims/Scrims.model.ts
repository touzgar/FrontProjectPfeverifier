import { Player } from "../player/player";
import { Session } from "../SessionTraining/session.model";

export class Scrims{
    session:Session[];
    idSession:number;
    description: string;
    niveau: string;
    mode: string;
    specialObjectives: string[];
    player:Player[];
    playerNames: string[];  
    sessionName: string;
    dateStart: string;
    dateEnd: string;
    feedbacksEntraineurs: string;
    objectivesNames: string[];
    coachName: string;
   
}