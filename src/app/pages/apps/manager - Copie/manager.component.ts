import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddManagerComponent } from './add/add.component';
export interface Manager {
  idManager: number;
  managerName: string;
}

const managers = [
  {
    idManager: 1,
    managerName: 'John Doe',
  },
  {
    idManager: 2,
    managerName: 'John Doe',
  },
  {
    idManager: 3,
    managerName: 'John Doe',
  },
  {
    idManager: 4,
    managerName: 'John Doe',
  },
  {
    idManager: 5,
    managerName: 'John Doe',
  },
  {
    idManager: 6,
    managerName: 'John Doe',
  },
  
];

@Component({
  templateUrl: './manager.component.html',
})
export class AppManagerComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'managerName',
    'action'

  ];
  dataSource = new MatTableDataSource(managers);
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
    const dialogRef = this.dialog.open(AppManagerDialogContentComponent, {
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
  addRowData(row_obj: Manager): void {
    this.dataSource.data.unshift({
      idManager: managers.length + 1,
      managerName: row_obj.managerName,
  
     
    });
    this.dialog.open(AppAddManagerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Manager): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.idManager === row_obj.idManager) {
        value.managerName = row_obj.managerName;
      }
      return true;
    });
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Manager): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.idManager !== row_obj.idManager;
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'manager-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppManagerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppManagerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Manager,
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
