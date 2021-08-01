import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../../user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private router: Router, private userManagement: UserManagementService) { }

  submit(): void {
    this.userManagement.login(this.email, this.password);
  }

  goToRegister(){
    this.router.navigate(["register"], {replaceUrl: true});
  }

}
