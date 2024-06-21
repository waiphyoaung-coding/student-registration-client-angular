import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestService } from '../rest.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() importEvent = new EventEmitter<any>()
  file!: File; 
  importFailed:boolean = false;
  constructor(private rest:RestService) { }

  ngOnInit(): void {
  }

  handleFileChange(event: any){
    this.file = event.target.files[0];
  }
  
  excelLoad(){
    this.rest.getStudentsExcel(`/excel`).subscribe((data:Blob)=>{
      if(data){
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'students.xlsx');
        document.body.appendChild(link);
        link.click();
      }
    })
  }

  importHandler(){
    if(this.file){
      const formData = new FormData();
      formData.append('file', this.file);
      this.rest.import('/import',formData).subscribe((response: HttpResponse<any>)=>{
        if(response){
          this.importEvent.emit()
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        this.importFailed = true;
      })
    }
  }

}
