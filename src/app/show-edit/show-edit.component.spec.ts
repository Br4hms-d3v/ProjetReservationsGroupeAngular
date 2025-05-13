import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEditComponent } from './show-edit.component';

describe('ShowEditComponent', () => {
  let component: ShowEditComponent;
  let fixture: ComponentFixture<ShowEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
