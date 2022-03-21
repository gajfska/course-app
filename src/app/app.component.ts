import { Component, OnInit } from '@angular/core';
import { Course } from './features/course/course.model';
import mockFile from './shared/mock.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'course-app';

  courses: Course[] = [];

  ngOnInit(): void {
    let mockData: Course[] = []
    for(let entity of mockFile) {
      let entityCopy:any = entity
      entityCopy["creationDate"] = new Date()
      mockData.push(entityCopy)
    }

    this.courses = mockData
  }

  reciveEditMessage($event: string){
    console.log($event)
  }
}
