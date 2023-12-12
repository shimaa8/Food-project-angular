/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { USERRECIPESComponent } from './USER-RECIPES.component';

describe('USERRECIPESComponent', () => {
  let component: USERRECIPESComponent;
  let fixture: ComponentFixture<USERRECIPESComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ USERRECIPESComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USERRECIPESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
