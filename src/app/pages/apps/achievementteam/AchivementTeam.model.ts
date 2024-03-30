import { Team } from "../team/team.model";

export class AchievementTeam{
    idAchivementsTeam: number;
    Trophie: string[];
    dateAchived: Date;
    achievementRank: string;
    teamName:string;
    teams: Team[] 
}