import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccesoriibarbatiComponent } from './pages/accesoriibarbati/accesoriibarbati.component';
import { AccesoriifemeiComponent } from './pages/accesoriifemei/accesoriifemei.component';
import { CosComponent } from './pages/cos/cos.component';
import { CosmeticefemeiComponent } from './pages/cosmeticefemei/cosmeticefemei.component';
import { IncaltamintebarbatiComponent } from './pages/incaltamintebarbati/incaltamintebarbati.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
{path:'', redirectTo:'home', pathMatch:'full'},
 {path:'home', component:MainComponent},
 {path:'femei/accesorii', component:AccesoriifemeiComponent},
 {path:'femei/cosmetice', component:CosmeticefemeiComponent},
 {path:'barbati/accesorii', component:AccesoriibarbatiComponent},
 {path:'barbati/incaltaminte', component:IncaltamintebarbatiComponent},
 {path:'cont', component:LoginComponent},
 {path:'cos', component:CosComponent},
 {path:'register', component:RegisterComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
