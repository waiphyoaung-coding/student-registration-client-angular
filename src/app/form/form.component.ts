import { Component, OnInit } from '@angular/core';
import { Student,Report } from '../models/student';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  student:Student = {
    id:'',
    studentID: '',
    name: '',
    nrc: '',
    dob: '',
    email: '',
    address: '',
    gender: 'MALE',
    state: 'YANGON',
    phonenumber: '',
    hobby: [],
    reports: []
  }

  constructor(private rest:RestService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      if(param){
        this.rest.get(`/${param.get('id')}`).subscribe((data)=>{
          this.student = data;
        })
      }
    })
  }

  onCheck(value:string){
    if(!this.student.hobby.some(h => h === value)){
      this.student.hobby.push(value);
    }else {
      this.student.hobby = this.student.hobby.filter(h => h !== value);
    }
  }

  onAdd(){
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

  calculateTotal(i:number) {
    this.student.reports[i].total = Number(this.student.reports[i].myanmar) + Number(this.student.reports[i].english) + Number(this.student.reports[i].mathematic) + Number(this.student.reports[i].history) + Number(this.student.reports[i].science);
  }

  goSave(){
    this.rest.post('/create',this.student).subscribe(
      data=>{
        if(data){
          alert("success")
          this.router.navigate(['/table'])
        }
      }
    )
  }

  goUpdate(){
    this.rest.put('/update',this.student).subscribe(
      data=>{
        if(data){
          alert('update success')
          this.router.navigate(['/table'])
        }
      }
    )
  }

  goBack(){
    this.router.navigate(['/table'])
  }

}
