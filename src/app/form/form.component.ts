import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Student, Report } from '../models/student';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import defaultImg from '../../assets/blank.jpg';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  student: Student = {
    id: '',
    studentID: '',
    name: '',
    nrc: '',
    dob: '',
    email: '',
    address: '',
    gender: 'MALE',
    state: 'YANGON',
    phonenumber: '',
    imageName:'',
    hobby: [],
    reports: []
  }

  imageURL!: SafeUrl;
  file!: File;
  getImageUrl = 'http://localhost:8080/api/image/'
  @ViewChild('imageInput') imageInput!: ElementRef;

  constructor(
    private rest: RestService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.route.paramMap.subscribe(param => {
      if (id) {
        this.rest.get(`/${id}`).subscribe((data) => {
          this.student = data;
        })
      }
    })
  }

  onClickImage() {
    this.imageInput.nativeElement.click()
  }

  handleImageChange(event: any): void {
    this.file = event.target.files[0];
    if (this.file) {
      this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.file));
    }
  }

  onCheck(value: string) {
    if (!this.student.hobby.some(h => h === value)) {
      this.student.hobby.push(value);
    } else {
      this.student.hobby = this.student.hobby.filter(h => h !== value);
    }
  }

  onAdd() {
    this.student.reports.push(
      {
        academicYear: '',
        myanmar: '',
        english: '',
        mathematic: '',
        history: '',
        science: '',
        total: ''
      }
    )
  }

  onRemove(index: number) {
    this.student.reports.splice(index, 1);
  }

  calculateTotal(i: number) {
    this.student.reports[i].total = Number(this.student.reports[i].myanmar) + Number(this.student.reports[i].english) + Number(this.student.reports[i].mathematic) + Number(this.student.reports[i].history) + Number(this.student.reports[i].science);
  }

  goSave() {
    if(!this.file){
      this.saveStudent()
      return;
    }
    const formData = new FormData();
    formData.append('file',this.file);
    this.rest.uploadImage('/upload',formData).subscribe({
      next: (response:any) => {
      if(response){
        console.log('image upload success')
        console.log(response)
        this.student.imageName = response.imageName;
        this.saveStudent()
      }
    },
    error: (error: any) => {
      console.error('image upload failed:', error);
    }
    })
  }

  saveStudent(){
    this.rest.post('/create', this.student).subscribe(
      data => {
        if (data) {
          alert("success")
          this.router.navigate(['/table'])
        }
      }
    )
  }

  goUpdate() {
    if(!this.file){
      this.updateStudent()
      return;
    }
    const formData = new FormData();
    formData.append('file',this.file);
    this.rest.uploadImage('/upload',formData).subscribe({
      next: (response:any) => {
      if(response){
        console.log('image upload success')
        this.student.imageName = response.imageName;
        this.updateStudent()
      }
    },
    error: (error: any) => {
      console.error('image upload failed:', error);
    }
    })
  }

  updateStudent(){
    this.rest.put('/update', this.student).subscribe(
      data => {
        if (data) {
          alert('update success')
          this.router.navigate(['/table'])
        }
      }
    )
  }

  goBack() {
    this.router.navigate(['/table'])
  }

}
