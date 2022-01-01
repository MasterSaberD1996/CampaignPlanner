import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {DatabaseService} from "./core/services/database.service";
import {AuthService} from "./core/services/auth.service";
import {autoMockerInstance} from "../test-utils/autoMockerPlus";

describe('AppComponent', () => {
  // let app: AppComponent;
  // let fixture: ComponentFixture<AppComponent>;
  // let databaseServiceMock: DatabaseService;
  // let authServiceMock: AuthService;
  // beforeEach(async () => {
  //   databaseServiceMock = autoMockerInstance.mockClass(DatabaseService);
  //   authServiceMock = autoMockerInstance.mockClass(AuthService);
  //   await TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent
  //     ],
  //     providers: [
  //       {
  //         provide: AuthService,
  //         useValue: authServiceMock
  //       },
  //       {
  //         provide: DatabaseService,
  //         useValue: databaseServiceMock
  //       }
  //     ]
  //   }).compileComponents();
  // });
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   app = fixture.componentInstance;
  // })
  //
  // it('should create the app', () => {
  //   expect(app).toBeTruthy();
  // });
  //
  // it(`should have as title 'DnD-Campaign-Planner'`, () => {
  //   expect(app.title).toEqual('DnD-Campaign-Planner');
  // });
  //
});
