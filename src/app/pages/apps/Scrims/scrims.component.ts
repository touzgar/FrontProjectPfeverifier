import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddScrimsComponent } from './add/add.component';
import { Scrims } from './Scrims.model';
import { ScrimsService } from './scrims.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  templateUrl: './scrims.component.html',
})
export class AppScrimsComponent implements AfterViewInit {
  scrims:Scrims[];
  titleScrims!:string;
  allScrims!:Scrims[];
  searchTerm!:string;
 
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    'description',
    'niveau',
    'specialObjectives',
    'mode',
    // 'playerNames',
    'action'

  ];
  dataSource = new MatTableDataSource<Scrims>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private scrimsService:ScrimsService,
    private changeDetectorRefs: ChangeDetectorRef,private router:Router, private activateRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerScrims();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppScrimsDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addScrims(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.modifierScrims(result.data);
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteScrims(result.data);
        this.deleteRowData(result.data);
      }
    });
  }
  chargerScrims() {
    this.scrimsService.listeScrims().subscribe(scrims => {
      this.dataSource.data = scrims;
      this.changeDetectorRefs.detectChanges(); // Ensure UI updates with new data
    });
  }
  deleteScrims(scrims:Scrims){
    this.scrimsService.supprimerScrims(scrims.idSession!).subscribe(() => {
      console.log('Session supprimé');
      this.chargerScrims();
   });
  }
  modifierScrims(scrims: any): void {
    const id = scrims.idSession;
  
   // If playerNames is a string of comma-separated values, convert it to an array
    let playerNamesArray: string[] = [];
    if (typeof scrims. scrimsPlayer === 'string') {
      playerNamesArray = scrims. scrimsPlayer.split(',').map((name: string) => name.trim());
    } else {
      playerNamesArray = scrims.scrimsPlayer;
    }
    
    let scrimsArray: string[] = [];
    if (typeof scrims.specialObjectives === 'string') {
      scrimsArray = scrims.specialObjectives.split(',').map((name: string) => name.trim());
    } else {
      scrimsArray = scrims.specialObjectives;
    }
    
  
    const updateData: Scrims = {
      ...scrims,
      
      //playerNames: playerNamesArray,
            specialObjectives: scrimsArray,

    };
  
    this.scrimsService.updateScrims(id, updateData).subscribe({
      next: (response) => {
        console.log('Scrims updated successfully', response);
        this.chargerScrims(); // Refresh the list
      },
      error: (error) => {
        console.error('Error updating Scrims', error);
      }
    });
  }

  getPlayerNamesForScrims(scrims: Scrims): string {
    // Ensure the property you're accessing matches what's available in your Scrims model
    if (!scrims.playerNames) { // This should match the actual property name
      return 'No Players'; // Or any default message you prefer
    }
    return scrims.playerNames.join(', '); // This joins the player names array into a comma-separated string
}

addScrims(sessionData: any): void {
  let dateStartISO, dateEndISO: string;

  try {
    sessionData.dateStart = this.toISODateString(sessionData.dateStart);
    sessionData.dateEnd = this.toISODateString(sessionData.dateEnd);
  } catch (error) {
    console.error('Date conversion error:', error);
    return;
  }
  // Assuming 'objectives' needs to be an array of strings
  const objectivesFormatted = Array.isArray(sessionData.objectives) 
    ? sessionData.objectives 
    : [sessionData.objectives];
    const specialObjective=Array.isArray(sessionData.specialObjective)?sessionData.specialObjective:[sessionData.specialObjective];

  // Prepare the players array
  const playerNamesFormatted = sessionData.playerNames 
    ? sessionData.playerNames.split(',').map((name: string) => name.trim()) 
    : [];

  // Construct the payload ensuring structure aligns with backend expectations
  const payload = {
    sessionName: sessionData.sessionName.trim(),
    dateStart: dateStartISO,
 //   dateEnd: dateEndISO,
    objectivesNames: objectivesFormatted,
    specialObject:specialObjective,
    feedbacksEntraineurs: sessionData.feedbacksEntraineurs.trim(),
    mode: sessionData.mode,
    niveau: sessionData.niveau,
    description: sessionData.description,
    coachName: sessionData.coachName.trim(),
    playerNames: playerNamesFormatted
  };

  this.scrimsService.addScrims(sessionData).subscribe({
    next: (response) => {
      console.log("Session added successfully", response);
      // Refresh your list or close dialog as necessary
    },
    error: (error) => {
      console.error("Error adding session", error);
      // Handle error
    }
  });
}

private toISODateString(date: any): string {
  if (date instanceof Date) {
    return date.toISOString();
  }
  const parsedDate = new Date(date);
  if (!isNaN(parsedDate.getTime())) {
    return parsedDate.toISOString();
  } else {
    throw new Error('Invalid date input');
  }
}

  
  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Scrims): void {
    
    this.dialog.open(AppAddScrimsComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Scrims): boolean | any {
    
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Scrims): boolean | any {
    
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'scrims-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppScrimsDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppScrimsDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Scrims,
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
function toISODateString(dateStart: any): any {
  throw new Error('Function not implemented.');
}

