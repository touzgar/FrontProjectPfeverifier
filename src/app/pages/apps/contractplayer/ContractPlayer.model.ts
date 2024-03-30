 // Adjust the path as necessary

import { Player } from "../player/player";

export class ContractPlayer {
  idContractPlayer: number;
  detailsContractuels: string;
  termesFinanciers: string;
  clausesSpecifiques: string;
  objectifs: string[];
  dateStart: Date;
  dateEnd: Date;
  leagalefullname?: string;
  player: Player[]; // Ensure this is meant to be an array
}
