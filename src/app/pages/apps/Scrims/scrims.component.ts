import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddScrimsComponent } from './add/add.component';

export interface Scrims {
  description: string;
  niveau: string;
  mode: string;
  specialObjectives: string[];
  scrimsPlayers: string[];
}

const Scrimss= [
  {
    description: "description",
    niveau: ' niveau',
    mode:"mode",
    specialObjectives:["sdfkj","jejez;"],
    scrimsPlayers:["sdfkj","jejez;"],
  },
];

@Component({
  templateUrl: './scrims.component.html',
})
export class AppScrimsComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    'description',
    'niveau',
    'specialObjectives',
    'scrimsPlayers',
    'action'

  ];
  dataSource = new MatTableDataSource(Scrimss);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Scrims): void {
    this.dataSource.data.unshift({
      description: row_obj.description,
      niveau: row_obj.niveau,
      mode: row_obj.mode,
      specialObjectives: row_obj.specialObjectives,
      scrimsPlayers: row_obj.scrimsPlayers,
    
    });
    this.dialog.open(AppAddScrimsComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Scrims): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      
        value.description = row_obj.description;
        value.niveau = row_obj.niveau;
        value.mode = row_obj.mode;
        value.specialObjectives = row_obj.specialObjectives;
        value.scrimsPlayers=row_obj.scrimsPlayers;
      
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Scrims): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.description !== row_obj.description;
    });
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
