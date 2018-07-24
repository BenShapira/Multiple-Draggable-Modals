import { Component, OnInit, ViewChild } from '@angular/core';
import { ExampleModalComponent } from './example-modal.component';
import { MultipleDraggableModalsComponent } from 'multiple-draggable-modals';

@Component({
  selector: 'app-root',
  template: `
  <button (click)="OpenModal()">Add Modal</button>
  <button (click)="RemoveAll()">Remove all</button>
  <multiple-draggable-modals #modals></multiple-draggable-modals>
  `,
})
export class AppComponent implements OnInit {

  @ViewChild(MultipleDraggableModalsComponent) modals: MultipleDraggableModalsComponent; // <--

  constructor(){}
  ngOnInit(){
  }

  OpenModal(){
    this.modals.AddModal("ModalName" ,ExampleModalComponent,{Name:'MyName', ArrayOfData:[1,2,3,4]},false,true,true,false,{Top:"10%", Left:"10%"});

    console.log(this.modals.ModalsArray);
  }
  RemoveAll(){
    this.modals.RemoveAll();
  }
}
