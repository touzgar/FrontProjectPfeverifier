import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddAchievementPlayerComponent } from './add/add.component';
import { AchievementPlayer } from './achivementPlayer.model';
import { AchivementPlayerService } from './achivement-player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { addHours, formatISO, startOfDay } from 'date-fns';


interface AchievementPlayerUpdateData extends Omit<AchievementPlayer, 'dateAchievement'> {
  dateAchievement: string;
}
@Component({
  templateUrl: './achievementplayer.component.html',
})



export class AppAchievementPlayerComponent implements AfterViewInit {
  achivementPlayer:AchievementPlayer[];
  
  
  titleAchievementPlayer!:string;
  allAchievementPlayer!:AchievementPlayer[];
  searchTerm!:string;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'playerName',
    'trophie',
    'dateAchievement',
    
    'action'

  ];
  dataSource = new MatTableDataSource<AchievementPlayer>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private achivementPlayerService:AchivementPlayerService,
    private changeDetectorRefs: ChangeDetectorRef,private router:Router, private activateRoute: ActivatedRoute) { }


    displayDate(ISODateString: string): string {
      const date = new Date(ISODateString);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      const localDate = new Date(date.getTime() - userTimezoneOffset);
      
      return this.datePipe.transform(localDate, 'fullDate') || 'Date not available';
    }
    
  


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerAchivementPlayer();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppAchievementPlayerDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addAchivementPlayer(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
       this.modifierAchivementPlayer(result.data);
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteAchivementPlayer(result.data);
        this.deleteRowData(result.data);
      }
    });
  }


  chargerAchivementPlayer() {
    this.achivementPlayerService.listeAchivementsPlayer().subscribe(achivements => {
      console.log(achivements); // Check the console to make sure 'coach' is populated
      this.achivementPlayer = achivements;
      this.dataSource.data = this.achivementPlayer; // Update the table's data source
      this.changeDetectorRefs.detectChanges(); // Trigger change detection
    });
  }

  deleteAchivementPlayer(achievementPlayer:AchievementPlayer){
    this.achivementPlayerService.supprimeAchivementsPlayer(achievementPlayer.idAchievementPlayer).subscribe(() => {
      console.log('AchivementPlayer supprimé');
      this.chargerAchivementPlayer();
   });
  }
  modifierAchivementPlayer(achievementPlayer: AchievementPlayer): void {
    const id = achievementPlayer.idAchievementPlayer;
  
    // Convert the local date to UTC format before sending
    const dateInUTC = new Date(achievementPlayer.dateAchievement).toISOString();

    // Clone the object to avoid mutating the original data
    const updateData = {
      ...achievementPlayer,
      dateAchievement: dateInUTC, // Use the UTC date
    };

  
    console.log('Data being sent to server:', updateData);
  
    this.achivementPlayerService.updateAchievementPlayer(id, updateData).subscribe({
      next: (response) => {
        console.log('AchievementPlayer updated successfully', response);
        this.chargerAchivementPlayer(); // Refresh the list
      },
      error: (error) => {
        console.error('Error updating AchievementPlayer', error);
      }
    });
  }


  addAchivementPlayer(achivement: AchievementPlayer) {
  // Ensure trophie is always an array
  const payload = {
    ...achivement,
    trophie: Array.isArray(achivement.trophie) ? achivement.trophie : [achivement.trophie]
  };

  this.achivementPlayerService.addAchivement(payload).subscribe({
    next: (newAchivement) => {
      console.log("Achivement added successfully", newAchivement);
      this.chargerAchivementPlayer(); // Refresh the list
    },
    error: (error) => {
      console.error("Error adding Achivement", error);
    }
  });
}

searchAchivements(event: Event) {
  const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
  const searchTerm = inputElement.value; // Now you can safely access .value
  if (searchTerm) {
    this.achivementPlayerService.rechercheParNameAchivementPlayer(searchTerm).subscribe(players => {
      this.dataSource.data = players;
    });
  } else {
    this.chargerAchivementPlayer();
  }
}


onkeyUp(filterText:string){
  this.achivementPlayer=this.allAchievementPlayer.filter(item=>item.playerName?.toLowerCase().includes(filterText));
}







  addRowData(row_obj: AchievementPlayer): void {
   
    this.dialog.open(AppAddAchievementPlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: AchievementPlayer): boolean | any {
  
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: AchievementPlayer): boolean | any {
    
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'achievementplayer-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppAchievementPlayerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppAchievementPlayerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AchievementPlayer,
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
