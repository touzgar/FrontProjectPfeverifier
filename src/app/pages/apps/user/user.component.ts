import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from './user.service'; // Update path as necessary

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { User } from '../../authentication/model/login.model';
import { Role } from '../../authentication/model/Role.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
 
})
export class AppUserComponent implements AfterViewInit {
  displayedColumns: string[] = ['username', 'password', 'email', 'action'];

  dataSource = new MatTableDataSource<User>();
  users? : User[];
  role?:Role[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService,private router:Router) {}

  ngAfterViewInit(): void {
    this.userService.listeUser().subscribe((users: User[]) => {
      this.dataSource.data = users; // Directly update dataSource.data
      this.dataSource.paginator = this.paginator;
    });
  }
  

  listeUser(): void {
    this.userService.listeUser().subscribe((users: User[]) => {
      this.users = users;
    });
  }
  goToRolesPage() {
    this.router.navigate(['/role']);
  }
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: 'user-dialog-content.html',
})
export class AppUserDialogContentComponent {
  public get dialogRef(): MatDialogRef<AppUserDialogContentComponent> {
    return this._dialogRef;
  }
  public set dialogRef(value: MatDialogRef<AppUserDialogContentComponent>) {
    this._dialogRef = value;
  }
  public action: string;
  public local_data: any;

  constructor(
    public datePipe: DatePipe,
    private _dialogRef: MatDialogRef<AppUserDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
}
