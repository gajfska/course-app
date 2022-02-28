import { Component, OnInit } from '@angular/core';
import { Course } from './features/course/course.model';
import data from './shared/mock.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'course-app';

  courses: Course[] = [];

  ngOnInit(): void {
    this.courses = data as Course[]
  }

  reciveEditMessage($event: string){
    console.log($event)
  }
}
