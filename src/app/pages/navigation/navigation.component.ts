import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  femeiOpen: boolean= false;
  barbatiOpen: boolean= false;
  loggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('glammy_user') !== null;
  }
  goToAccesoriiF(){
    this.router.navigate(["femei/accesorii"], {replaceUrl:true});
  }
  goToCosmeticeF(){
    this.router.navigate(["femei/cosmetice"], {replaceUrl:true});
  }
  goToAccesoriiB(){
    this.router.navigate(["barbati/accesorii"], {replaceUrl:true});
  }
  goToIncaltaminteB(){
    this.router.navigate(["barbati/incaltaminte"], {replaceUrl:true});
  }
  goToCos(){
    this.router.navigate(["cos"], {replaceUrl:true});
  }
  goToCont(){
    this.router.navigate(["cont"], {replaceUrl:true});
  }
  goToRegister(){
    this.router.navigate(["register"], {replaceUrl:true});
  }
  goToGlammy(){
    this.router.navigate(["home"], {replaceUrl:true});
  }
  OpenFemei(){
    this.femeiOpen=true;
  }
  CloseFemei(){
    this.femeiOpen=false;
  }
  OpenBarbati(){
    this.barbatiOpen=true;
  }
  CloseBarbati(){
    this.barbatiOpen=false;
  }

  logout() {
    localStorage.removeItem('glammy_user');
    this.loggedIn = localStorage.getItem('glammy_user') !== null;
  }
}
