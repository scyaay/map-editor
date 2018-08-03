import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideToolbarComponent } from './side-toolbar.component';
import { MatIconModule, MatButtonModule, MatSnackBarModule } from '../../../../../node_modules/@angular/material';

describe('SideToolbarComponent', () => {
  let component: SideToolbarComponent;
  let fixture: ComponentFixture<SideToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideToolbarComponent ],
      imports: [MatIconModule, MatButtonModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
