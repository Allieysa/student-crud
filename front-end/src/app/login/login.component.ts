import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill all fields correctly';
      return;
    }

    const bodyData = { email: this.email, password: this.password };

    this.http.post('http://localhost:3000/student/login', bodyData)
      .subscribe({
        next: (resultData: any) => {
        console.log(resultData);
        alert('Student Login Successfully');
        this.router.navigateByUrl('/student-crud');
      },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Login failed. Please try again.';
        }
      });
  }
    save(form: NgForm) {
    this.login(form);
  }
}
