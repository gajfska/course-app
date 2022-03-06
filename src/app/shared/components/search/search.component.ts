import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() placeholder!: string;
  @Output() searchWordEvent =  new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  onSubmitFunc(form: NgForm){
    this.searchWordEvent.emit(form.value.search);
  }

}
