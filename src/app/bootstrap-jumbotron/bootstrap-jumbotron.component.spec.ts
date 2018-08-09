import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapJumbotronComponent } from './bootstrap-jumbotron.component';

describe('BootstrapJumbotronComponent', () => {
  let component: BootstrapJumbotronComponent;
  let fixture: ComponentFixture<BootstrapJumbotronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapJumbotronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapJumbotronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
