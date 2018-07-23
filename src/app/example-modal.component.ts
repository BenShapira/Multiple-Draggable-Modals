import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-modal',
  template: `
    <div class="modal-container">
      <div class="header draggable">Modal Header <span class="close">X</span></div>
      <div>
        {{Data.Name}}
        {{ModalId}}

        <button class="close">test Close!</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-container{
      width:150px;
      height:150px;
      border: 1px solid black;
      border-radius: 5px;
      padding:5px;
      background-color:white;
    }
    .header{
      border-bottom:1px solid black;
      cursor:move;
    }
    .close{
      float:right;
      font-weight:5px;
      cursor:pointer;
    }
  `]
})
export class ExampleModalComponent implements OnInit {
  Data:any;
  ModalId:any;
  constructor() {}

  ngOnInit() {}
}