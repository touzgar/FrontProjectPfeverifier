import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddContractPlayerComponent } from './add/add.component';
import { ContractPlayer } from './ContractPlayer.model';
import { ContractPlayerService } from './contract-player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../player/player';



@Component({
  templateUrl: './contractplayer.component.html',
})
export class AppContractPlayerComponent implements AfterViewInit {
  contractPlayer:ContractPlayer[];
  titleContractPlayer!:string;
  allContractPlayer!:ContractPlayer[];
  searchTerm!:string;
  

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'detailsContractuels',
    'termesFinanciers',
    'clausesSpecifiques',
    'objectifs',
    'dateStart',
    'dateEnd',
    'playerName', // Add this line
    'action'
  ];
   
  dataSource = new MatTableDataSource<ContractPlayer>([])
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private contractPlayerService:ContractPlayerService,
    private changeDetectorRefs: ChangeDetectorRef,private router:Router, private activateRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerContractPlayer();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppContractPlayerDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addContractPlayer(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.modifierContractPlayer(result.data);
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteContractPlayer(result.data);
        this.deleteRowData(result.data);
      }
    });
  }


  chargerContractPlayer() {
    this.contractPlayerService.listeContractPlayer().subscribe(contractPlayers => {
      console.log(contractPlayers); // Check the console to make sure 'coach' is populated
      this.contractPlayer = contractPlayers;
      this.dataSource.data = this.contractPlayer; // Update the table's data source
      this.changeDetectorRefs.detectChanges(); // Trigger change detection
    });
  }
  deleteContractPlayer(contractPlayer:ContractPlayer){
    this.contractPlayerService.supprimerContractPlayer(contractPlayer.idContractPlayer).subscribe(() => {
      console.log('ContractPlayer supprimé');
      this.chargerContractPlayer();
   });
  }
  modifierContractPlayer(contractPlayer: ContractPlayer): void {
    const id = contractPlayer.idContractPlayer;
  
    // Assume dateStart and dateEnd are already Date objects, so no conversion is needed here
    const updateData = {
      ...contractPlayer,
      // Keep the dates as Date objects
      dateStart: contractPlayer.dateStart,
      dateEnd: contractPlayer.dateEnd,
    };
  
    console.log('Data being sent to server:', updateData);
  
    this.contractPlayerService.updateContractPlayer(id, updateData).subscribe({
      next: (response) => {
        console.log('ContractPlayer updated successfully', response);
        this.chargerContractPlayer(); // Refresh the list
      },
      error: (error) => {
        console.error('Error updating ContractPlayer', error);
      }
    });
  }
//  // In your Angular component that calls the service

// addContractPlayer(contractPlayerData: ContractPlayer) {
//   // Ensure 'objectifs' is formatted as an array
//   const payload = {
//     ...contractPlayerData,
//     objectifs: Array.isArray(contractPlayerData.objectifs) ? contractPlayerData.objectifs : [contractPlayerData.objectifs]
//   };

//   this.contractPlayerService.addContractPlayer(payload).subscribe({
//     next: (newContractPlayer) => {
//       console.log("ContractPlayer added successfully", newContractPlayer);
//       this.chargerContractPlayer(); // Refresh the list of contract players
//     },
//     error: (error) => {
//       console.error("Error adding ContractPlayer", error);
//     }
//   });
// }
addContractPlayer(contractPlayerData: ContractPlayer) {
  // Ensure 'objectifs' is formatted as an array
  const payload: ContractPlayer = {
    ...contractPlayerData,
    objectifs: Array.isArray(contractPlayerData.objectifs) ? contractPlayerData.objectifs : [contractPlayerData.objectifs],
  };

  this.contractPlayerService.addContractPlayer(payload).subscribe({
    next: (newContractPlayer) => {
      console.log("ContractPlayer added successfully", newContractPlayer);
      this.chargerContractPlayer(); // Refresh the list of contract players
    },
    error: (error) => {
      console.error("Error adding ContractPlayer", error);
    }
  });
}

  searchContract(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const searchTerm = inputElement.value; // Now you can safely access .value
    if (searchTerm) {
      this.contractPlayerService.rechercheParNameContractPlayer(searchTerm).subscribe(players => {
        this.dataSource.data = players;
      });
    } else {
      this.chargerContractPlayer();
    }
  }
  
  
  onkeyUp(filterText:string){
    this.contractPlayer=this.allContractPlayer.filter(item=>item.leagalefullname?.toLowerCase().includes(filterText));
  }
  




  
  getPlayerNamesForContractPlayer(contractPlayer: ContractPlayer): string {
    // If 'player' is an array, map through it and join the names
    if (Array.isArray(contractPlayer.player)) {
      return contractPlayer.player.map(p => p.leagalefullname).join(', ');
    } 
    // If 'player' is an object, use type assertion to access 'leagalefullname'
    else if (contractPlayer.player && typeof contractPlayer.player === 'object') {
      // Use type assertion here
      const player = contractPlayer.player as Player; // Cast to Player type
      return player.leagalefullname;
    } 
    else {
      console.error('Unexpected structure for player, received:', contractPlayer.player);
      return 'No Player Info'; // Default text or handling for unexpected structure
    }
  }
  
  


  // tslint:disable-next-line - Disables all
  addRowData(row_obj: ContractPlayer): void {
    this.dialog.open(AppAddContractPlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: ContractPlayer): boolean | any {
   
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: ContractPlayer): boolean | any {
   
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'contractplayer-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppContractPlayerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppContractPlayerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ContractPlayer,
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
