import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddCompitencePlayerComponent } from './add/add.component';




export interface Compitence {
  idCompetence: number;
  competence: string;
  historiquePerformence: string;
  kdRiot: number;
  winPorsontage: string;
  leagalefullname?: string;
}

const Compitences = [
  {
    idCompetence: 1,
    competence: ' competence',
    historiquePerformence: "silver , Goled ,iron",
    kdRiot: 50,
    winPorsontage: '70%'
  },
 
  {
    idCompetence: 2,
    competence: ' competence',
    historiquePerformence: "silver , Goled ,iron",
    kdRiot: 50,
    winPorsontage: '70%.'
  },
  {
    idCompetence: 3,
    competence: ' competence',
    historiquePerformence: "silver , Goled ,iron",
    kdRiot: 50,
  
    winPorsontage: '70%.'
  },
  {
    idCompetence: 4,
    competence: ' competence',
    historiquePerformence: "silver , Goled ,iron",
    kdRiot: 50,
 
    winPorsontage: '70%.'
  },
  {
    idCompetence: 5,
    competence: ' competence',
    historiquePerformence: "silver , Goled ,iron",
    kdRiot: 50,

    winPorsontage: '70%.'
  },
  {
    idCompetence: 6,
    competence: ' competence',
    historiquePerformence: "silver , Goled ,iron",
    kdRiot: 50,
  
    winPorsontage: '70%.'
  },
  {
    idCompetence: 7,
    competence: ' competence',
    historiquePerformence: "silver , Goled ,iron",
    kdRiot: 50,

    winPorsontage: '70%.'
  },
  {
    idCompetence: 8,
    competence: ' competence',
    historiquePerformence: "silver , Goled ,iron",
    kdRiot: 50,
 
    winPorsontage: '70%.'
  },
  {
    idCompetence: 9,
    competence: ' competence',
    historiquePerformence: "silver , Goled ,iron",
    kdRiot: 50,

    winPorsontage: '70%.'
  },
];

@Component({
  templateUrl: './compitenceplayer.component.html',
})
export class AppCompitencePlayerComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'competence',
    'historiquePerformence',
    'kdRiot',
    'winPorsontage',
    'action'

  ];
  dataSource = new MatTableDataSource(Compitences);
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
    const dialogRef = this.dialog.open(AppCompitencePlayerDialogContentComponent, {
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
  addRowData(row_obj: Compitence): void {
    this.dataSource.data.unshift({
      idCompetence: Compitences.length + 1,
      competence: row_obj.competence,
      historiquePerformence: row_obj.historiquePerformence,
      kdRiot: row_obj.kdRiot,
      winPorsontage: row_obj.winPorsontage,
    
    });
    this.dialog.open(AppAddCompitencePlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Compitence): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idCompetence === row_obj.idCompetence) {
        value.competence = row_obj.competence;
        value.historiquePerformence = row_obj.historiquePerformence;
        value.kdRiot = row_obj.kdRiot;
        value.winPorsontage = row_obj.winPorsontage;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Compitence): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idCompetence !== row_obj.idCompetence;
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'compitenceplayer-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppCompitencePlayerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppCompitencePlayerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Compitence,
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
