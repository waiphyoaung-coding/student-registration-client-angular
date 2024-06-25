import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Student } from '../models/student';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  studentList:Student[] = [];
  students:Student[] = [];
  loading:boolean = true;
  fetchFailed:boolean = false;
  delete:boolean = false;

  search:string = '';
  deleteId:number|string = '';
  message:string = ''

  totalItems:number = 0;
  itemsPerPage:number = 5;
  currentPage:number = 1;
  constructor(private rest:RestService,private router:Router) { }

  ngOnInit(): void {
    this.getFetch()
  }

  getFetch(){
    this.rest.get('/fetch').subscribe((data)=>{
      if(data){
        this.studentList = data;
        this.students = data;
        this.loading = false;
        this.totalItems = data.length;
      }
    },
    (error : HttpErrorResponse)=>{
      this.loading = false;
      this.fetchFailed=true;
    })
  }

  getSlicedStudents(){
    return this.students.slice(this.itemsPerPage*(this.currentPage-1),(this.itemsPerPage*this.currentPage))
  }

  onSearchChange(){
    if(this.search !== ''){
      this.students = this.studentList.filter(
        s => 
        s.name.toString().toLowerCase().includes(this.search.toString().toLowerCase()) || 
        s.studentID.toString().includes(this.search.toString())
      );
      this.totalItems = this.students.length
    }else{
      this.students = this.studentList
      this.totalItems = this.studentList.length
    }
  }

  goForm(){
    this.router.navigate(['/form'])
  }

  goUpdate(id:number|string){
    this.router.navigate([`/form/${id}`]);
  }

  goDelete(id:number|string,message:string){
    this.deleteId = id;
    this.message = message;
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  handleModalDelete(){
    this.getFetch()
  }

  handleImportSuccess(){
    this.getFetch()
  }

  onPageChanged(pageNumber: number) {
    this.currentPage = pageNumber
  }

  handleImport(){
    const modalElement = document.querySelector('#excelModal')
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  download(data:Blob){
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'students.xlsx');
    document.body.appendChild(link);
    link.click();
  }

  export(){
    this.rest.getStudentsExcel('/export').subscribe((data:Blob)=>{
      if(data){
        this.download(data)
      }
    })
  }

  exportById(id:number|string){
    this.rest.getStudentsExcel(`/export/${id}`).subscribe((data:Blob)=>{
      if(data){
        this.download(data)
      }
    })
  }

  downloadPdf(){
    this.rest.getPdf('/pdf').subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'students.pdf';
      a.click();
      window.URL.revokeObjectURL(url)
    })
  }

}
