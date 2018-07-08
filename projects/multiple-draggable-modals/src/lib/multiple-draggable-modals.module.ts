import { NgModule } from '@angular/core';
import { MultipleDraggableModalsComponent } from './multiple-draggable-modals.component';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [
  ],
  declarations: [MultipleDraggableModalsComponent, ModalComponent],
  exports: [MultipleDraggableModalsComponent],
  entryComponents: [ModalComponent]
})
export class MultipleDraggableModalsModule { }
