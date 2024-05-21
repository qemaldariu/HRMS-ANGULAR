import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './features/user-login/user-login.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { EmployeeListComponent } from './features/employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './features/employee/employee-detail/employee-detail.component';
import { EmployeeComponent } from './features/employee/employee.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './features/header/header.component';
import { EmployeeCreateComponent } from './features/header/employee-create/employee-create.component';
import {AuthInterceptor} from "./auth.interceptor";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {LoginService} from "./shared/services/LoginService";
import {EmployeeService} from "./shared/services/EmployeeService";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { FooterComponent } from './footer/footer.component';
import {FilterPipe} from "./shared/Pipes/filter.pipe";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { EmployeeFilteringByDepComponent } from './features/header/employee-filtering-by-dep/employee-filtering-by-dep.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-login', pathMatch: 'full' },
  { path: 'user-login', component: UserLoginComponent },

  { path: 'dashboard', component: HeaderComponent},
  { path: 'filterbydepartment/:departmentId', component: EmployeeFilteringByDepComponent },

  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/details/:id', component: EmployeeDetailComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeComponent,
    HeaderComponent,
    EmployeeCreateComponent,
    FooterComponent,
    FilterPipe,
    EmployeeFilteringByDepComponent


  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    CommonModule


  ],
  providers: [
    LoginService,
    EmployeeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
