import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cos',
  templateUrl: './cos.component.html',
  styleUrls: ['./cos.component.css']
})
export class CosComponent implements OnInit {
  public products = [];
  public total = 0;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    console.log(`logged user: ${localStorage.getItem('glammy_user')}`);
    this.http.post<any>(`${environment.serverUrl}/products`, {user_id: localStorage.getItem('glammy_user')}).subscribe(data => {
      if (data.status === 'ok') {
        this.products = data.products;
        this.products.forEach(product => {
          this.total += parseInt(product.bucati) * parseFloat(product.pret);
        });
      }
    });
  }

  checkout(): void {
    console.log('Sending order...');
    this.http.post<any>(`${environment.serverUrl}/checkout`, {user_id: localStorage.getItem('glammy_user')}).subscribe(data => {
      if (data === 'ok') {
        console.log('Order sent');
        this.router.navigate(["home"], {replaceUrl: true});
      }
    });
  }

}
