import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../course/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  @Input() courses: Course[] = []
  @Input() areCoursesEditable: boolean = false;

  editMessage: string = "This course is in edit mode!"
  @Output() editEvent = new EventEmitter<string>();

  showConfirmModalWindow: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  sendMessage(){
    this.editEvent.emit(this.editMessage);
  }

  reciveModalResultState($event: boolean){
    this.showConfirmModalWindow = $event;
  }

  showModalWindow(){
    this.showConfirmModalWindow = true;
  }

}
