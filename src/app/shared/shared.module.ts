import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, ButtonComponent, InfoComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmModalWindowComponent } from './components/confirm-modal-window/confirm-modal-window.component';

const COMPONENTS: any[] = [HeaderComponent, ButtonComponent, InfoComponent, ConfirmModalWindowComponent];


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule {}
