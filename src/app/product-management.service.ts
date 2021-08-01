
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  constructor(private http: HttpClient) { }

  public cumpara(user_id: number, titlu: string, pret: string, descriere: string): void {
    this.http.post<any>(`${environment.serverUrl}/add`, { user_id: user_id, title: titlu, pret: pret, descriere: descriere}).subscribe(data => {
      if (data === 'ok') {
        console.info('Product added to cart');
      }
    });
  }

  public getProducts(): any {
    this.http.get<any>(`${environment.serverUrl}/products?user_id=` + localStorage.getItem('glammy_user')).subscribe(data => {
      if (data.status === 'ok') {
        return data.products;
      }
    });
  }
}
