import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, ButtonComponent, InfoComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmModalWindowComponent } from './components/confirm-modal-window/confirm-modal-window.component';
import { EmailValidatorDirective } from './emailValidatorDirective';
import { AuthorValidatorDirective } from './authorValidatorDirective';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { DurationPipe } from './pipes/duration.pipe';
import { StringJoinerPipe } from './pipes/stringJoiner.pipe';
import { CreationDatePipe } from './pipes/creationDate.pipe';

const COMPONENTS: any[] = [HeaderComponent, ButtonComponent, InfoComponent, ConfirmModalWindowComponent, SearchComponent]
const VALIDATORS: any [] = [EmailValidatorDirective, AuthorValidatorDirective]
const PIPES: any [] = [DurationPipe, CreationDatePipe, StringJoinerPipe]

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...VALIDATORS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    ...COMPONENTS,
    ...VALIDATORS,
    ...PIPES
  ]
})
export class SharedModule {}
