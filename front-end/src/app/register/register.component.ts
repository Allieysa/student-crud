import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor(private http: HttpClient, private router:Router) { }

  register(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const bodyData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/student/create', bodyData)
      .subscribe({
        next: (resultData: any) => {
        console.log(resultData);
        alert('Student Registered Successfully');
        this.router.navigate(['/login']);
      },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Registration failed. Please try again.';
        }
   });
  }

  save(form: NgForm) {
    this.register(form);
  }
}
