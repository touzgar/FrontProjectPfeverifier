import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddTournamentComponent } from './add/add.component';




export interface Tournament {
  idTournament: number;
  tournamentName: string;
  dateStart: Date;
  dateEnd: Date;
  Format: string;
  PrizePool: number;
  status:boolean;
  capacity:number;
}

const tournaments= [
  {
    idTournament: 1,
    tournamentName: ' gng',
    dateStart:new Date('04-2-2020'),
    dateEnd:new Date('04-2-2020'),
    Format : "Format",
    PrizePool:5000,
    status:true,
    capacity:500

  },
  {
    idTournament: 2,
    tournamentName: ' gng',
    dateStart:new Date('04-2-2020'),
    dateEnd:new Date('04-2-2020'),
    Format : "Format",
    PrizePool:5000,
    status:true,
    capacity:500

  },
  {
    idTournament: 3,
    tournamentName: ' gng',
    dateStart:new Date('04-2-2020'),
    dateEnd:new Date('04-2-2020'),
    Format : "Format",
    PrizePool:5000,
    status:true,
    capacity:500

  },
  {
    idTournament: 4,
    tournamentName: ' gng',
    dateStart:new Date('04-2-2020'),
    dateEnd:new Date('04-2-2020'),
    Format : "Format",
    PrizePool:5000,
    status:true,
    capacity:500

  },
  {
    idTournament: 5,
    tournamentName: ' gng',
    dateStart:new Date('04-2-2020'),
    dateEnd:new Date('04-2-2020'),
    Format : "Format",
    PrizePool:5000,
    status:true,
    capacity:500

  },
 
  {
    idTournament: 6,
    tournamentName: ' gng',
    dateStart:new Date('04-2-2020'),
    dateEnd:new Date('04-2-2020'),
    Format : "Format",
    PrizePool:5000,
    status:true,
    capacity:500

  },
 
 
];

@Component({
  templateUrl: './tournament.component.html',
})
export class AppTournamentComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'tournamentName',
    'dateStart',
    'dateEnd',
    'Format',
    'PrizePool',
    'status',
    'capacity',
    'action'

  ];
  dataSource = new MatTableDataSource(tournaments);
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
    const dialogRef = this.dialog.open(AppTournamentDialogContentComponent, {
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
  addRowData(row_obj: Tournament): void {
    this.dataSource.data.unshift({
      idTournament: tournaments.length + 1,
      tournamentName: row_obj.tournamentName,
      dateStart: row_obj.dateStart,
      dateEnd: row_obj.dateEnd,
      Format: row_obj.Format,
      PrizePool:row_obj.PrizePool,
      status:row_obj.status,
      capacity:row_obj.capacity
    
    });
    this.dialog.open(AppAddTournamentComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Tournament): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.tournamentName === row_obj.tournamentName) {
        value.dateStart = row_obj.dateStart;
        value.dateEnd = row_obj.dateEnd;
        value.Format = row_obj.Format;
        value.PrizePool = row_obj.PrizePool;
        value.status=row_obj.status;
        value.capacity=row_obj.capacity
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Tournament): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idTournament !== row_obj.idTournament;
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'tournament-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppTournamentDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppTournamentDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Tournament,
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
