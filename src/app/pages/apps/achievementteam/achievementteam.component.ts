import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddAchievementPlayerComponent } from '../achievementplayer/add/add.component';




export interface Achivment {
  idAchivementsTeam: number;
  tournamentName: string;
  Trophie: string[];
  dateAchived: Date;
  achievementRank: string;
teamname?:string;
}

const achivments = [
  {
    idAchivementsTeam: 1,
    tournamentName: 'lol',
    Trophie: ['First Place Trophy', 'Second Place Trophy'],
    dateAchived: new Date('2023-01-15'),
    achievementRank: 'bronze2',
  },
  {
    idAchivementsTeam: 2,
    tournamentName: 'valo',
    Trophie: ['First Place Trophy', 'Second Place Trophy'],
    dateAchived: new Date('2023-01-15'),
    achievementRank: 'bronze2',
  },
  {
    idAchivementsTeam: 3,
    tournamentName: 'csgo',
    Trophie: ['First Place Trophy', 'Second Place Trophy'],
    dateAchived: new Date('2023-01-15'),
    achievementRank: 'bronze2',
  },
  {
    idAchivementsTeam: 4,
    tournamentName: 'wow',
    Trophie: ['First Place Trophy', 'Second Place Trophy'],
    dateAchived: new Date('2023-01-15'),
    achievementRank: 'bronze2',
  },
];

@Component({
  templateUrl: './achievementteam.component.html',
})
export class AppAchievementTeamComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'tournamentName',
    'Trophie',
    'dateAchived',
    'achievementRank',
    'action'

  ];
  dataSource = new MatTableDataSource(achivments);
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
    const dialogRef = this.dialog.open(AppAchievementTeamDialogContentComponent, {
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
  addRowData(row_obj: Achivment): void {
    this.dataSource.data.unshift({
      idAchivementsTeam: achivments.length + 1,
      tournamentName: row_obj.tournamentName,
      Trophie: row_obj.Trophie,
      dateAchived: new Date(),
      achievementRank: row_obj.achievementRank,
      
     
    });
    this.dialog.open(AppAddAchievementPlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Achivment): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idAchivementsTeam === row_obj.idAchivementsTeam) {
        value.tournamentName = row_obj.tournamentName;
        value.Trophie = row_obj.Trophie;
        value.dateAchived = row_obj.dateAchived;
        value.achievementRank = row_obj.achievementRank;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Achivment): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idAchivementsTeam !== row_obj.idAchivementsTeam;
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'achievementteam-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppAchievementTeamDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppAchievementTeamDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Achivment,
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