import { Component, OnInit } from '@angular/core';
import { UserStateFacade } from 'src/app/user/store/user.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
