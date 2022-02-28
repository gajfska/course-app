import { Component, Input, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  @Input() description?: string;
  @Input() iconName?: IconName;


  ngOnInit(): void {}

}
