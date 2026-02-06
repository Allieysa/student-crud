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

      if (resultData.status === true) {
        localStorage.setItem("email", this.email);
        this.router.navigateByUrl('/student-crud');
      } else {
        alert("Login failed: " + resultData.message);
      }
    },
    error: (err) => {
      console.log(err);
      alert("Something went wrong!");
    }
  });
  }
    save(form: NgForm) {
    this.login(form);
  }
}
