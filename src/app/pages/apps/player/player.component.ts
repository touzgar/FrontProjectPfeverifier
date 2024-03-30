import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddPlayerComponent } from './add/add.component';
import { Player } from './player';
import { PlayerServiceService } from './player-service.service';
import { ThisReceiver } from '@angular/compiler';





@Component({
  templateUrl: './player.component.html',
})
export class AppPlayerComponent implements AfterViewInit {
  joueur=new Player();
   player!:Player[];
  
  currentPlayer = new Player();
  
  titlePlayer!:string;
  allPlayer!:Player[];
  searchTerm!:string;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    'playerId', 'name', 'inGameName', 'dateOfBirth', 
    'mailAdress', 'discordId', 'countryOfResidence', 
    'jerseySize', 'whatsappPhone', 'contratStart', 
    'contratEnd', 'salary', 'socialMediaLinks', 'action'
  ];
  dataSource = new MatTableDataSource<Player>([])
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe, private playerService: PlayerServiceService, private changeDetectorRefs: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerPlayer();
  }

  applyFilter(filterValue: string): void {

  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppPlayerDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addPlayer(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.modifierPlayer(result.data)
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deletePlayer(result.data);
        this.deleteRowData(result.data);
      }
    });
  }
  
  chargerPlayer() {
    this.playerService.listePlayer().subscribe(players => {
      this.dataSource.data = players;
      this.changeDetectorRefs.detectChanges(); // Ensure UI updates with new data
    });
  }
  addPlayer(player: Player) {
    this.playerService.addPlayer(player).subscribe({
      next: (newPlayer) => {
        console.log("Player added successfully", newPlayer);
        this.chargerPlayer(); // Refresh the list
      },
      error: (error) => {
        console.error("Error adding team", error);
      }
    });
  }

  deletePlayer(player:Player){
    this.playerService.supprimerPlayer(player.idPlayer!).subscribe(() => {
      console.log('Player supprimé');
      this.chargerPlayer();
   });
  }
  modifierPlayer(player: Player): void {
    this.playerService.updatePlayer(player).subscribe(() => {
      console.log('Player updated successfully');
      this.chargerPlayer(); // Refresh the list
    }, error => {
      console.error('Error updating player', error);
    });
  }
  searchPlayers(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.trim().toLowerCase();
  
    if (searchTerm) {
      this.playerService.rechercheParNamePlayer(searchTerm).subscribe({
        next: (players) => {
          // Assuming 'players' is an array of Player objects. If not, adjust accordingly.
          this.dataSource.data = players;
  
          // For debugging, log the players to see if the data is as expected.
          console.log(players);
        },
        error: (error) => {
          console.error('Search error:', error);
          this.dataSource.data = [];
        }
      });
    } else {
      // If the search term is cleared, reload all players.
      this.chargerPlayer();
    }
  }
    // Inside AppPlayerComponent

  
  
  onkeyUp(filterText:string){
    this.player=this.allPlayer.filter(item=>item.leagalefullname.toLowerCase().includes(filterText));
  }

  

  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Player): void {
  
    this.dialog.open(AppAddPlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Player): boolean | any {
   
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Player): boolean | any {
  
  }
  
  
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'player-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppPlayerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppPlayerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Player,
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
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
   
  }
}
