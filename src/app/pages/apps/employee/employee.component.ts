import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddEmployeeComponent } from './add/add.component';
import { Tournament, Tournoi } from './Tournament.model';
import { TournamentService } from './tournament.service';
import { AddTeamsToTournamentComponent } from './add-teams-to-tournament/add-teams-to-tournament.component';
import { RemoveTeamsToTournamentComponent } from './remove-teams-to-tournament/remove-teams-to-tournament.component';


@Component({
  
  templateUrl: './employee.component.html',
})
export class AppEmployeeComponent implements AfterViewInit {
  tournament:Tournament[];
  tournoi=new Tournament();
  tournois=new Tournoi();
  
  currentTournament = new Tournament();
  
  titleTournament!:string;
  allTournament!:Tournament[];
  searchTerm!:string;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    'idTournament',
    'tournamentName',
     'dateStart',
     'dateEnd',
     'Format',
    'PrizePool',
    'status',
    'capacity',
     'teamName',
    //  'matchName',
    'action',
  ];
  dataSource = new MatTableDataSource<Tournament>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,
    private tournamentService: TournamentService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerTournament();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppEmployeeDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.event) {
      if (result.event === 'Add') {
        this.addTournament(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.modifierTournament(result.data);
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteTournament(result.data);
        this.deleteRowData(result.data);
      }
    }
    });
  }


  openAddTeamsDialog(): void {
    const dialogRef = this.dialog.open(AddTeamsToTournamentComponent, {
      width: '600px',
      data: { tournamentName: '', teamNames: '' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Ensure you're passing the correct parameters to the service method
        this.addTeamsToTournament(result.tournamentName, result.teamNames);
      }
    });
  }


  openRemoveTeamsDialog(): void {
    const dialogRef = this.dialog.open(RemoveTeamsToTournamentComponent, {
      width: '600px',
      data: { tournamentName: '', teamNames: '' } 
       });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.tournamentName && Array.isArray(result.teamNames)) {
        // Ensure you're passing the correct parameters to the service method
        this.removeTeamFromTournament(result.tournamentName, result.teamNames);
      }
    });
  }
 



  chargerTournament() {
    this.tournamentService.listeTournament().subscribe(tournaments => {
      console.log(tournaments); // Debug: Check if data contains Format and PrizePool
      this.dataSource.data = tournaments;
      this.changeDetectorRefs.detectChanges(); // Ensure UI updates with new data
    });
}

addTournament(tournamentData: any) {
  // Convert the status to a boolean if it's a string representation of a boolean ('true'/'false')
  const statusAsBoolean = typeof tournamentData.status === 'string' ?
                          tournamentData.status.toLowerCase() === 'true' :
                          tournamentData.status;

  // Create a new Tournament object with the correct types
  const newTournoi: Tournoi = {
    tournamentName: tournamentData.tournamentName,
    dateStart: new Date(tournamentData.dateStart).toISOString(),
    dateEnd: new Date(tournamentData.dateEnd).toISOString(),
    format: tournamentData.format,
    prizePool: Number(tournamentData.prizePool), // Ensure this is a number
    status: statusAsBoolean, // Ensure this is a boolean
    capacity: Number(tournamentData.capacity), // Ensure this is a number
  };

  // Call the service to add the new tournament
  this.tournamentService.addTournament(newTournoi).subscribe({
    next: (createdTournament) => {
      console.log("Tournament added successfully", createdTournament);
      this.chargerTournament(); // Refresh the list
    },
    error: (error) => {
      console.error("Error adding tournament", error);
    }
  });
}
modifierTournament(tournament: Tournament): void {
  this.tournamentService.updateTournament(tournament).subscribe(() => {
    console.log('Tournament updated successfully');
    this.chargerTournament(); // Refresh the list
  }, error => {
    console.error('Error updating player', error);
  });
}



  deleteTournament(tournament:Tournament){
    this.tournamentService.supprimerTournament(tournament.idTournament!).subscribe(() => {
      console.log('Tournament supprimé');
      this.chargerTournament();
   });
  }
  addTeamsToTournament(tournamentName: string, teamNamesString: string) {
    const teamNames = teamNamesString.split(',').map(name => name.trim());
    this.tournamentService.addTeamsToTournament(tournamentName, teamNames).subscribe({
      next: (response) => {
        console.log("Teams added successfully", response);
        // Refresh the tournament data here if necessary
        this.chargerTournament();
      },
      error: (error) => {
        console.error("Error adding teams to tournament", error);
      }
    });
   }
   getTeamNamesForTournament(tournament: Tournament): string {
        // Make sure to check if 'coaches' is not undefined or null
        return tournament.teams?.map(c => c.teamName).join(', ') || 'No teamName';
    }
    removeTeamFromTournament(tournamentName: string, teamNames: string[]): void {
      this.tournamentService.removeTeamsFromTournament(tournamentName, teamNames).subscribe({
        next: (response) => {
          console.log("Teams removed successfully", response);
          this.chargerTournament();
          // Refresh your team or players list here if necessary
        },
        error: (error) => {
          console.error("Error removing Teams from tournament", error);
        }
      });
    } 
  
    loadHistoricalTournament(): void {
      this.tournamentService.getHistoricalTournament().subscribe({
        next: (tournaments) => {
          this.dataSource.data = tournaments;
          console.log('Historical tournaments loaded:', tournaments);
        },
        error: (error) => {
          console.error('Error loading historical tournaments:', error);
        }
      });
    }
    searchTournament(event: Event) {
      const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
      const searchTerm = inputElement.value; // Now you can safely access .value
      if (searchTerm) {
        this.tournamentService.rechercheParNameTournament(searchTerm).subscribe(tournaments => {
          this.dataSource.data = tournaments;
        });
      } else {
        this.chargerTournament();
      }
    }
    
    
    onkeyUp(filterText:string){
      this.tournament=this.allTournament.filter(item=>item.tournamentName?.toLowerCase().includes(filterText));
    }
   
  //   getMatchNamesForTournament(tournament: Tournament): string {
  //     // Make sure to check if 'coaches' is not undefined or null
  //     return tournament.defis?.map(c => c.matchName).join(', ') || 'No matchName';
  // }




  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Tournament): void {
    
    this.dialog.open(AppAddEmployeeComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Tournament): boolean | any {
    
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Tournament): boolean | any {
    
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'employee-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppEmployeeDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppEmployeeDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Tournament,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd',
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    }
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
  // Inside your Dialog Component when closing the dialog
this.dialogRef.close({ event: 'SomeEvent', data: this.local_data });

  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }
  
}
