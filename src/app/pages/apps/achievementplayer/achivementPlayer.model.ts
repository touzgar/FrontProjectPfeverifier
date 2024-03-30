import { Player } from "../player/player";
export interface AchievementPlayer {
    idAchievementPlayer: number;
    playerName: string;
    trophie: string[]; // If sometimes you receive an array or a string, otherwise keep as string
    dateAchievement: string; // Expecting a string ISO date format for updates
    player: Player;
  }
  
  

