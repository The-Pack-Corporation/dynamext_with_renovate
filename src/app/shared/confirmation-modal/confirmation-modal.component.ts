import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  @Output() confirmedEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancelledEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('showModal', {static:true}) showModal: ElementRef;



  constructor() { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.showModal.nativeElement.click();
    this.confirmedEvent.emit();
  }

  onCancel() {
    this.cancelledEvent.emit();
  }

  show() {
    this.showModal.nativeElement.click();
  }

}
