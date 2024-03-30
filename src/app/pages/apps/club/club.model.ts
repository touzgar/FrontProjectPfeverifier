import { Coach } from "../coach/coach.model";

export class Club {
    idClub: number;
    clubName: string;
    description: string;
    dateCreation: Date;
    coach: Coach[]; // Array of Coach objects // Ensure this property is populated by the back-end
}
