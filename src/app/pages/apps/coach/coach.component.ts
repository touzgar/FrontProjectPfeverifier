import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddCoachComponent } from './add/add.component';
import { Coach } from './coach.model';
import { CoachService } from './coach.service';
import { ActivatedRoute, Router } from '@angular/router';








@Component({
  templateUrl: './coach.component.html',
})
export class AppCoachComponent implements AfterViewInit {
  coach:Coach[];
  
  currentCoach= new Coach();
  trainer:Coach=new  Coach();
  titleCoach!:string;
  allCoach!:Coach[];
  searchTerm!:string;

  
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = ['idCoach', 'nameCoach', 'email', 'rapport', 'clubName', 'action'];

  dataSource = new MatTableDataSource<Coach>([])
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private coachService:CoachService,
    private changeDetectorRefs: ChangeDetectorRef,private router:Router, private activateRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerCoach();
    // this.coachService.consulterCoach(this.activateRoute.snapshot.params['id']).subscribe(coach => {
    //   this.currentCoach = coach;
    //   console.log(coach);
    // });
  }

  applyFilter(filterValue: string): void {
    
  }


  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppCoachDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addCoach(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.modifierCoach(result.data);
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteCoach(result.data);
        this.deleteRowData(result.data);
      }
    });
  }



  chargerCoach() {
    this.coachService.listeCoach().subscribe(coachs => {
      console.log(coachs); // To see the exact structure right before assignment
      this.coach = coachs;
      this.dataSource.data = this.coach;
      this.changeDetectorRefs.detectChanges();
    });
    
  }
  addCoach(coach: Coach) {
    this.coachService.addCoach(coach).subscribe({
      next: (newCoach) => {
        console.log("Coach added successfully", newCoach);
        this.chargerCoach(); // Refresh the list
      },
      error: (error) => {
        console.error("Error adding coach", error);
      }
    });
  }

  deleteCoach(coach:Coach){
    this.coachService.supprimerCoach(coach.idCoach).subscribe(() => {
      console.log('Coach supprimé');
      this.chargerCoach();
   });
  }
  
  modifierCoach(coach: Coach): void {
    this.coachService.updateCoach(coach).subscribe(() => {
      console.log('Coach updated successfully');
      this.chargerCoach(); // Refresh the list
    }, error => {
      console.error('Error updating coach', error);
    });
  }
  
  rechercherCoach(event: Event) {
    const target = event.target as HTMLInputElement; // Type assertion
    const searchTerm = target.value; // Now safely access the value
  
    if (searchTerm) {
      this.coachService.rechercheParNameCoach(searchTerm).subscribe(coachs => {
        this.dataSource.data = coachs;
      }, error => {
        console.error('Error during search:', error);
        this.dataSource.data = [];
      });
    } else {
      this.chargerCoach(); // Reload all coaches if the search term is cleared
    }
  }
   
  onkeyUp(filterText:string){
    this.coach=this.allCoach.filter(item=>item.nameCoach?.toLowerCase().includes(filterText));
  }
  
  
  






  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Coach): void {
    this.dialog.open(AppAddCoachComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Coach): boolean | any {
    
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Coach): boolean | any {
     }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'coach-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppCoachDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
 
  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppCoachDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Coach,
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
