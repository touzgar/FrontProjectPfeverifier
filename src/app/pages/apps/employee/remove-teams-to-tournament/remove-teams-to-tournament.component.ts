import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-teams-to-tournament',
  templateUrl: './remove-teams-to-tournament.component.html',
  styleUrl: './remove-teams-to-tournament.component.scss'
})
export class RemoveTeamsToTournamentComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveTeamsToTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRemoveClick(): void {
    // Convert playerNames to an array if it's a string
    let teamNamesArray: string[] = [];
    if (typeof this.data.teamNames === 'string') {
      teamNamesArray = this.data.teamNames.split(',').map((name: string) => name.trim()); // Added type annotation
    } else if (Array.isArray(this.data.teamNames)) {
      teamNamesArray = this.data.teamNames;
    }

    if (this.data.tournamentName && teamNamesArray.length > 0) {
      this.dialogRef.close({
        tournamentName: this.data.tournamentName,
        teamNames: teamNamesArray,
      });
    }
  }
}
