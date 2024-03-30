import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-teams-to-tournament',
  templateUrl: './add-teams-to-tournament.component.html',
  styleUrl: './add-teams-to-tournament.component.scss'
})
export class AddTeamsToTournamentComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTeamsToTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    // Assuming data contains { teamName: '', coachName: '' }
    if (this.data.tournamentName && this.data.teamName) {
      // Data is valid
      this.dialogRef.close(this.data);
    }
  }


}
