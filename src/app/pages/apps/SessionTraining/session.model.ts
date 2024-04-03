import { Coach } from "../coach/coach.model";
import { Player } from "../player/player";

export class Session {
    idSession: number;
  sessionName: string;
  dateStart: string; // Changed to string type if you are not converting dates from JSON
  dateEnd: string;   // Changed to string type if you are not converting dates from JSON
  objectifs: string[];
  feedbacksEntraineurs: string;
  presencePlayer: Player[];
  coach: Coach;
  coachName: string;
  playerNames: string;
    // Other properties as needed
  }
  