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
    this.http.get<StudentRegistration[]>('http://localhost:3000/student-course/all')
      .subscribe(data => this.registrations = data);
  }

  saveRegistration() {
    if (this.editingId) {
      this.http.put(`http://localhost:3000/student-course/update/${this.editingId}`, this.student)
        .subscribe(() => {
          this.loadRegistrations();
          this.resetForm();
        });
    } else {
      this.http.post('http://localhost:3000/student-course/register', this.student)
        .subscribe(() => {
          this.loadRegistrations();
          this.resetForm();
        });
    }
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
