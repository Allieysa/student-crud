import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface StudentRegistration {
  _id?: string;
  studentId: string;
  subject: string;
  semester: string;
  credits: number;
}

@Component({
  selector: 'app-student-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.scss']
})
export class StudentCrudComponent implements OnInit {
  student: StudentRegistration = { studentId: '', subject: '', semester: '', credits: 0 };
  registrations: StudentRegistration[] = [];
  editingId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRegistrations();
  }

  loadRegistrations() {
  const email = localStorage.getItem("email");

  this.http.get<any[]>(`http://localhost:3000/student-course/all?email=${email}`)
    .subscribe((data) => {
      this.registrations = data;
    });
}

  saveRegistration() {
  const email = localStorage.getItem("email");

  const bodyData = {
    email: email,
    studentId: this.student.studentId,
    subject: this.student.subject,
    semester: this.student.semester,
    credits: this.student.credits
  };

  this.http.post("http://localhost:3000/student-course/register", bodyData)
    .subscribe(() => {
      alert("Course registered successfully");
      this.loadRegistrations();
    });
}

  editRegistration(reg: StudentRegistration) {
    this.student = { ...reg };
    this.editingId = reg._id!;
  }

  deleteRegistration(id: string) {
    this.http.delete(`http://localhost:3000/student-course/delete/${id}`)
      .subscribe(() => this.loadRegistrations());
  }

  resetForm() {
    this.student = { studentId: '', subject: '', semester: '', credits: 0 };
    this.editingId = null;
  }
}
