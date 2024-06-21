import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() deleteId:number|string = '';
  @Input() message:string = '';
  @Output() modalEvent = new EventEmitter<any>()
  constructor(private rest:RestService,private router:Router) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.rest.delete(`/delete/${this.deleteId}`).subscribe(
      (data)=>{
        this.modalEvent.emit()
      }
    )
  }

}
