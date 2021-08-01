import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/user-management.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(private router: Router, private userManagement: UserManagementService) { }

  submit(): void {
    this.userManagement.register(this.firstName, this.lastName, this.email, this.password);
  }

}
