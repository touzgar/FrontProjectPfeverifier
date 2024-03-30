import { Tournament } from "../employee/Tournament.model";

export class Defi {
  idMatch: number;
  matchName: string;
  dateStart: Date;
  result: string;
  tournamentName?: string; // Optional if you keep this
  tournament?: Tournament;  // Can be an array or a single object
   // Use primitive string type
  matchDateTime: Date;
  matchDescription: string;
}
