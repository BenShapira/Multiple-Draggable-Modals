# Multiple Draggable Modals

### Description
Multiple-Draggable-Modals is an Angular library which can be used at any situation requires to open one or more than a single modal, initiate data to each one as well as controlling them seperatly, switching the focus between them, dragging them freely around the screen and remove them from the DOM once being closed.

  - Easy to use
  - Supports Mobile (Touch to Drag)


### Author
Ben Shapira

### License
Free to use under the MIT license, see LICENSE file.

## Install:
```bash
npm install multiple-draggable-modals
```

## Demo
[StackBlitz](https://stackblitz.com/edit/angular-ivy-bhhabh?)

## Usage
In your application root module definition import `MultipleDraggableModalsModule` and the Component which you would like to use as a modal.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ExampleComponent } from './example.component';

import { MultipleDraggableModalsModule } from 'multiple-draggable-modals';

@NgModule({
  imports:      [ BrowserModule, FormsModule, MultipleDraggableModalsModule ],
  declarations: [ AppComponent, ExampleComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

In your application where you wish to use the library, import `MultipleDraggableModalsComponent` and the component you wish to use as a modal, add the tags to your template and refrence it from your component ts file.

**app.ts -**
```typescript
//our root app component
import { Component, ViewChild } from '@angular/core';
import { MultipleDraggableModalsComponent } from 'multiple-draggable-modals';

//Component which you would like to use as a modal - 
import { ExampleComponent } from './example.component';

@Component({
  selector: 'my-app',
  template: `
  <div class="field">
  <label>Data : </label>
   <input id="modal-data" type="text" [(ngModel)]="Data">
  </div>

  <div class="field">
  <label>Backdrop : </label> 
  <input id="modal-backdrop" type="checkbox" [(ngModel)]="Backdrop">
  </div>

  <div class="field">
  <label>Escape : </label> 
  <input id="modal-escape" type="checkbox" [(ngModel)]="Escape">
  </div>

  <div class="field">
  <label>Animation : </label> 
  <input id="modal-animation" type="checkbox" [(ngModel)]="Animation">
  </div>

  <div class="buttons">
  <button (click)="OpenModal()">Add Modal</button>
  <button (click)="RemoveAll()">Remove all</button>
  </div>
  
  <multiple-draggable-modals #modals></multiple-draggable-modals>
  `,
})
export class AppComponent {
  Data:any; // Property which can be used to transfer any kind of data to the modal.
  Backdrop:boolean = false;
  Escape:boolean = false;
  Animation:boolean = true;

  @ViewChild(MultipleDraggableModalsComponent, {static: false}) modals: MultipleDraggableModalsComponent; // <--

  constructor(){}
  ngOnInit(){}

  OpenModal(){
    this.modals.AddModal("ExampleName",ExampleComponent,this.Data,this.Backdrop,this.Escape,this.Animation);
  }
  RemoveAll(){
    this.modals.RemoveAll();
  }
}

```

**ExampleComponent.ts-**

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <div class="modal-container">
      <div class="header draggable">Draggable<span class="close">X</span></div>
      <div>
        {{Data}}
      </div>
    </div>
  `
})
export class ExampleComponent implements OnInit {
  Data:any;
  constructor() {}

  ngOnInit() {}
}
```


Following the example above will create a modal window of the component `ExampleComponent` every time You click the Add Modal button.

### Important Notes


 -Modal can be closed and destroyed by anything you add the class `close` to in your modal component.

 -Modal can be draggable by anything you add the class `draggable` to in your modal component.
  
### Methods Available


 **-AddModal(ModalName, ComponentType, Data, Backdrop, Escape, Animation, Center, Position) : returns the modal Id**

    ModalName = String, used to identify a modal inside the container.

    ComponentType = The component type that you want to use as a modal.

    Data = Any type of data that you want, make sure that your ComponentType has a public Property called - `Data`.

    BackDrop = Boolean, default value is false, if set to true the modal will have a Backdrop.

    Escape = Boolean, default value is false, if set to true clicking the escape button while focusing the modal will close and destory it.

    Animation = Boolean, default value is true, if set to false there will be no fade-in/fade-out and lower-opacity on drag animations.

    Center = Boolean, default value is true, center to modal window.

    Position = Object {Top:String, Left:String}, custom position to the window, will only work of center is set to false.

```typescript
    var modal = this.modals.AddModal("ModalName", ExampleComponent,{Name:'MyName', ArrayOfData:[1,2,3,4]},false,true,true,true, {Top:"30%",Left:"17%"});
```

 **-RemoveModal(modalId)**

   Removes The specified modal by the Id provided.

 **-RemoveAll()**

   Simple as it sounds, removes all the open modals.
   




