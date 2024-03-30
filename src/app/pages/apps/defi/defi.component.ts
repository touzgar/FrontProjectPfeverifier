import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddDefiComponent } from './add/add.component';
import { Defi } from './defi.model';
import { DefiService } from './defi.service';
import { ActivatedRoute, Router } from '@angular/router';





@Component({
  templateUrl: './defi.component.html',
})
export class AppDefiComponent implements AfterViewInit {
  defi!:Defi[];
  currentDefi = new Defi();
  match:Defi=new  Defi();
  titleDefi!:string;
  allDefi!:Defi[];
  searchTerm!:string;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'matchName',
    'dateStart',
    'result',
    'tournamentName', // Add this line
    'action'
];
  dataSource = new MatTableDataSource<Defi>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private defiService:DefiService, 
    private changeDetectorRefs: ChangeDetectorRef,private router:Router, private activateRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerDefi();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppDefiDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {

        this.handleAddMatch(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.modifierDefi(result.data);
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteDefi(result.data);
        this.deleteRowData(result.data);
      }
    });
  }

 



  chargerDefi() {
    this.defiService.listeDefi().subscribe(defis => {
      console.log('Defis received:', defis);
      this.defi = defis;
      this.dataSource.data = this.defi; // No need to map if defi already contains the tournament object correctly
      this.changeDetectorRefs.detectChanges();
    });
  }
  
  modifierDefi(defi: Defi): void {
    this.defiService.updateDefi(defi).subscribe(() => {
      console.log('Defi updated successfully');
      this.chargerDefi(); // Refresh the list
    }, error => {
      console.error('Error updating club', error);
    });
  }

  deleteDefi(defi:Defi){
    this.defiService.supprimerDefi(defi.idMatch!).subscribe(() => {
      console.log('Defi supprimé');
      this.chargerDefi();
   });
  }



 
  handleAddMatch(data: Defi): void {
    // Ensure tournamentName is a string. If undefined, default to an empty string or a placeholder string.
    const tournamentName = data.tournamentName ?? '';

    // Ensure matchDateTime is a Date object and format it to an ISO string.
    const matchDateTime = data.matchDateTime instanceof Date ? data.matchDateTime.toISOString() : new Date().toISOString();
    
    const payload = {
      tournamentName: tournamentName, // Ensured to be a string
      matchDescription: data.matchDescription,
      matchDateTime: matchDateTime
    };

    this.defiService.addMatchToTournament(payload).subscribe({
        next: (response) => {
            console.log('Match added successfully:', response);
            this.chargerDefi(); // Reload your data
        },
        error: (error) => {
            console.error('Error adding match:', error);
        }
    });
}

  
  searchMatchs(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const searchTerm = inputElement.value; // Now you can safely access .value
    if (searchTerm) {
      this.defiService.rechercheParNameMatch(searchTerm).subscribe(matchs => {
        this.dataSource.data = matchs;
      });
    } else {
      this.chargerDefi();
    }
  }
  
  
  onkeyUp(filterText:string){
    this.defi=this.allDefi.filter(item=>item.matchName?.toLowerCase().includes(filterText));
  }
  
  
  loadHistoricalMatches(): void {
    this.defiService.getHistoricalMatches().subscribe({
      next: (matches) => {
        this.dataSource.data = matches;
        console.log('Historical matches loaded:', matches);
      },
      error: (error) => {
        console.error('Error loading historical matches:', error);
      }
    });
  }
  getTournamentNamesForDefi(defi: Defi): string {
    // If there is a tournament, return its name; otherwise return 'No Tournament'
    return defi.tournament?.tournamentName || 'No Tournament';
  }
  

 
  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Defi): void {
    this.dialog.open(AppAddDefiComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Defi): boolean | any {
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Defi ): boolean | any {
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'defi-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppDefiDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppDefiDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Defi,
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
