import { Component, Input, OnInit } from '@angular/core';
import { Course } from './course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {


  @Input() course: Course = {
    title: '',
    description: '',
    id: 0,
    creationDate: 0,
    duration: 0,
    authors: []
  };

  constructor() { }

  ngOnInit(): void { }

  minutesToTime(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const hoursRightFormat = hours < 10 ? '0' + hours : hours;
    const minutesRightFormat = minutes < 10 ? '0' + minutes : minutes;
    return `${hoursRightFormat}:${minutesRightFormat}`
  }

}
