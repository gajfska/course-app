import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal-window',
  templateUrl: './confirm-modal-window.component.html',
  styleUrls: ['./confirm-modal-window.component.scss']
})
export class ConfirmModalWindowComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() okButtonText: string | undefined;
  @Input() cancelButtonText: string | undefined;

  @Output() modalResult = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void { }

  sendModalResultState(result: boolean) {
    this.modalResult.emit(result);
  }

}
