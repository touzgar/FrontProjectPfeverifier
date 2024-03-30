import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddClubComponent } from './add/add.component';
import { Club } from './club.model';
import { ClubService } from './club.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  templateUrl: './club.component.html',
})
export class AppClubComponent implements AfterViewInit {
  club:Club[];
  currentClub = new Club();
  team:Club=new  Club();
  titleCLub!:string;
  allClub!:Club[];
  searchTerm!:string;

  
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    'idClub',
    'clubName',
    'description',
    'dateCreation',
    "nameCoach",
    
    'action'

  ];
  dataSource = new MatTableDataSource<Club>([])
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private clubService:ClubService,
     private changeDetectorRefs: ChangeDetectorRef,private router:Router, private activateRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerClub();
    // this.clubService.consulterClub(this.activateRoute.snapshot.params['idClub']).subscribe(club => {
    //   this.currentClub = club;
    //   console.log(club);
    // });

  }

  applyFilter(filterValue: string): void {
  
  }

  openDialog(action: string, obj: any = {}): void {
    obj.action = action;
    
    const dialogRef = this.dialog.open(AppClubDialogContentComponent, {
      data: obj,
      
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addClub(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.modifierClub(result.data);
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteClub(result.data);
        this.deleteRowData(result.data);
      }
    });
  }

  chargerClub() {
    this.clubService.listeClub().subscribe(clubs => {
      console.log(clubs); // Check the console to make sure 'coach' is populated
      this.club = clubs;
      this.dataSource.data = this.club; // Update the table's data source
      this.changeDetectorRefs.detectChanges(); // Trigger change detection
    });
  }
  addClub(club: Club) {
    this.clubService.addClub(club).subscribe({
      next: (newClub) => {
        console.log("Club added successfully", newClub);
        this.chargerClub(); // Refresh the list
      },
      error: (error) => {
        console.error("Error adding club", error);
      }
    });
  }
  
 deleteClub(club:Club){
  this.clubService.supprimerClub(club.idClub).subscribe(() => {
    console.log('Club supprimé');
    this.chargerClub();
 });
}

modifierClub(club: Club): void {
  this.clubService.updateClub(club).subscribe(() => {
    console.log('Club updated successfully');
    this.chargerClub(); // Refresh the list
  }, error => {
    console.error('Error updating club', error);
  });
}


// In your component class
searchClubs(event: Event) {
  const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
  const searchTerm = inputElement.value; // Now you can safely access .value
  if (searchTerm) {
    this.clubService.rechercheParNameClub(searchTerm).subscribe(clubs => {
      this.dataSource.data = clubs;
    });
  } else {
    this.chargerClub();
  }
}


onkeyUp(filterText:string){
  this.club=this.allClub.filter(item=>item.clubName?.toLowerCase().includes(filterText));
}

// Inside your component class

getCoachNamesForClub(club: Club): string {
  return club.coach.map(c => c.nameCoach).join(', ');
}

  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Club): void {
  
  
    this.dialog.open(AppAddClubComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Club): boolean | any {
   
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Club): boolean | any {
   
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'club-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppClubDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppClubDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Club,
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

  
}