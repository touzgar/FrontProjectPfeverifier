import { Component, OnInit } from '@angular/core';
import { Role } from '../../authentication/model/Role.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'] // Fixed property name and made it an array
})
export class RoleComponent implements OnInit {
  role?: Role[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.listeRole();
  }

  listeRole() {
    this.userService.getAllRoles().subscribe((roles) => {
      console.log(roles);
      this.role = roles;
    }); // Added missing ending parenthesis and curly brace
  }
}
