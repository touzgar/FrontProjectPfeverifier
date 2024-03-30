import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddSessionTrainingComponent } from './add/add.component';




export interface SessionTraining {
  idSession: number;
  sessionName: string;
  dateStart: Date;
  dateEnd: Date;
  objectifs: string[];
  feedbacksEntraineurs: string;
}

const SessionTrainings= [
  {
    idSession: 1,
  sessionName: "session",
  dateStart:new Date('04-2-2020'),
  dateEnd:new Date('04-2-2020'),
  objectifs: ["kkhkk","kki"],
  feedbacksEntraineurs: "feedback"

  },
  {
    idSession: 2,
  sessionName: "session",
  dateStart:new Date('04-2-2020'),
  dateEnd:new Date('04-2-2020'),
  objectifs: ["kkhkk","kki"],
  feedbacksEntraineurs: "feedback"

  },
  {
    idSession: 3,
  sessionName: "session",
  dateStart:new Date('04-2-2020'),
  dateEnd:new Date('04-2-2020'),
  objectifs: ["kkhkk","kki"],
  feedbacksEntraineurs: "feedback"

  },
  {
    idSession: 4,
  sessionName: "session",
  dateStart:new Date('04-2-2020'),
  dateEnd:new Date('04-2-2020'),
  objectifs: ["kkhkk","kki"],
  feedbacksEntraineurs: "feedback"

  },
  {
    idSession: 6,
  sessionName: "session",
  dateStart:new Date('04-2-2020'),
  dateEnd:new Date('04-2-2020'),
  objectifs: ["kkhkk","kki"],
  feedbacksEntraineurs: "feedback"

  },
 
 
];

@Component({
  templateUrl: './SessionTraining.component.html',
})
export class AppSessionTrainingComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'sessionName',
    'dateStart',
    'dateEnd',
    'objectifs',
    'feedbacksEntraineurs',
    'action'

  ];
  dataSource = new MatTableDataSource(SessionTrainings);
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
    const dialogRef = this.dialog.open(AppSessionTrainingDialogContentComponent, {
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
  addRowData(row_obj: SessionTraining): void {
    this.dataSource.data.unshift({
      idSession: SessionTrainings.length + 1,
      sessionName: row_obj.sessionName  ,
      dateStart: row_obj.dateStart,
      dateEnd: row_obj.dateEnd,
      objectifs: row_obj.objectifs,
      feedbacksEntraineurs:row_obj.feedbacksEntraineurs,
    
    });
    this.dialog.open(AppAddSessionTrainingComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: SessionTraining): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idSession === row_obj.idSession) {
        value.sessionName = row_obj.sessionName;
        value.dateStart = row_obj.dateStart;
        value.dateEnd = row_obj.dateEnd;
        value.objectifs = row_obj.objectifs;
        value.feedbacksEntraineurs=row_obj.feedbacksEntraineurs;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: SessionTraining): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idSession !== row_obj.idSession;
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'SessionTraining-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppSessionTrainingDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppSessionTrainingDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: SessionTraining,
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
