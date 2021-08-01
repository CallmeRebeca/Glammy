/*import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CosComponent } from './cos.component';

describe('CosComponent', () => {
  let component: CosComponent;
  let fixture: ComponentFixture<CosComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ CosComponent ],
      providers: [ HttpClient, HttpHandler ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CosComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); */

import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CosComponent } from './cos.component';

describe('CosComponent', () => {
  let component: CosComponent;
  let fixture: ComponentFixture<CosComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ CosComponent ],
      providers: [ HttpClient, HttpHandler ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CosComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show products', () => {
    expect(component.products.length).toBe(0);
    component.products.push({name: 'Bocanci', pret: 30, descriere: 'bocanci de iarna barbati', bucati: 1});
    fixture.detectChanges();
    expect(component.products.length).toBe(1);

    // Check how many html components we have in basket
    let items = fixture.debugElement.queryAll(By.css("h4")).length;
    expect(items).toBe(1);     // One item expected if one was added in array of products
    expect(fixture.nativeElement.querySelector('h4').innerText).toBe('Bocanci');

    // Add another item in the array
    component.products.push({name: 'Pantofi', pret: 30, descriere: 'pantofi femei', bucati: 20});
    fixture.detectChanges();
    expect(component.products.length).toBe(2);
    // Expect that the html updates accordingly
    items = fixture.debugElement.queryAll(By.css("h4")).length;
    expect(items).toBe(2);
    
  });
});

