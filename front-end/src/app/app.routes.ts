import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentCrudComponent } from './student-crud/student-crud/student-crud.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // default route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student-crud', component: StudentCrudComponent},
  { path: '**', redirectTo: '/login' } // fallback route
];
