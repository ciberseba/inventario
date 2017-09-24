import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarStockComponent } from './listar-stock.component';

describe('ListarStockComponent', () => {
  let component: ListarStockComponent;
  let fixture: ComponentFixture<ListarStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
