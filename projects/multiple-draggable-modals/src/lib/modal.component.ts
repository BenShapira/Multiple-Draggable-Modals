import { Component, ComponentFactoryResolver, ViewChild, AfterViewInit, ViewContainerRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  styles: [`
          .multiple-draggable-modal{
            position:fixed;
            top:10%;
            left:10%;
            outline: none;
            opacity: 0;
          }
          .center-modal{
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
          }
          .fade-in-out{
            transition:opacity 0.2s linear;
            -webkit-transition: opacity 0.2s ease-in-out;
            -moz-transition: opacity 0.2s ease-in-out;
            -ms-transition: opacity 0.2s ease-in-out;
            -o-transition: opacity 0.2s ease-in-out;
            opacity: 0;
          }
          .modal-backdrop {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: .5;
            background-color: #000;
          }
        `],
  template: `
            <div id="modal-{{uniqueID}}-backdrop"></div>
            <div id="modal-{{uniqueID}}" class="multiple-draggable-modal" (mousedown)="AddzIndex()">
              <ng-template #container></ng-template>
            </div>
            `
})
export class ModalComponent implements AfterViewInit {
    
  @ViewChild('container', { read: ViewContainerRef }) container;
  uniqueID;
  Self;
  Component;

  //Passed Data
  Data:any;
  Center:boolean = false;
  Position:any = {Top:'10%', Left:'10%'}
  ModalBackdrop:boolean = false;
  ModalEscape:boolean = false;
  Animation:boolean = true;
  

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    //Initiate component body
    this.addComponent();
    //Set modal draggable by class .draggable (touch and mouse)
    this.dragElement(document.getElementById("modal-" + this.uniqueID));
    this.TouchDragElement(document.getElementById("modal-" + this.uniqueID).getElementsByClassName("draggable")[0]);
    //focus
    this.AddzIndex();
    //Init modal, animations, backdrop, position
    if (this.ModalBackdrop) {
        document.getElementById("modal-" + this.uniqueID + "-backdrop").className += " modal-backdrop";
    }

    if(this.Center){
        (<HTMLElement>document.getElementById("modal-" + this.uniqueID)).className += " center-modal";
    }else{
        //Set CSS
        (<HTMLElement>document.getElementById("modal-" + this.uniqueID)).style.top = this.Position.Top;
        (<HTMLElement>document.getElementById("modal-" + this.uniqueID)).style.left = this.Position.Left;
    }

    if (this.Animation) {
        document.getElementById("modal-" + this.uniqueID).className += " fade-in-out";
        setTimeout(() => {
            document.getElementById("modal-" + this.uniqueID).style.opacity = "1";
        }, 150);
    }
    else {
        document.getElementById("modal-" + this.uniqueID).style.opacity = "1";
    }
    
    //Close modal and destroy on all .close class click
    var closeElements =  document.getElementById("modal-" + this.uniqueID).getElementsByClassName("close");
    for(let i = 0; i < closeElements.length; i++) {
        closeElements[i].addEventListener("click", ()=> {
            document.getElementById("modal-" + this.uniqueID).style.opacity = "0";
            setTimeout(() => {
                this.Self.destroy();
            }, 250);
        });
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event) {
    if (this.ModalEscape) {
        if (event.keyCode === 27) {
            if (this.IsFocused()) {
              (<HTMLElement>(document.getElementById("modal-" + this.uniqueID).getElementsByClassName("close")[0])).click();
            }
        }
    }
  }

  AddzIndex() {
    var highest = this.findHighestZIndex();
    document.getElementById("modal-" + this.uniqueID).style.zIndex = (highest + 2).toString();
    if (this.ModalBackdrop) {
        document.getElementById("modal-" + this.uniqueID + "-backdrop").style.zIndex = (highest + 1).toString();
    }
  }

  IsFocused() {
      var current = parseInt(document.getElementById("modal-" + this.uniqueID).style.zIndex);
      var highest = this.findHighestZIndex();
      if (current === highest) {
          return true;
      }
      else
          return false;
  }

  findHighestZIndex() {
    var elements = document.getElementsByTagName('*');
    var highest = 0;
    for (var i = 0; i < elements.length; i++) {
        var zindex = parseInt(document.defaultView.getComputedStyle(elements[i], null).getPropertyValue("z-index"));
        if (zindex > highest) {
            highest = zindex;
        }
    }
    return highest;
  }

  addComponent() {
    // Create component 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.Component);
    const component = this.container.createComponent(componentFactory);
    //Init data and detectChanges  
    ((component.instance)).Data = this.Data;
    ((component.instance)).ModalId = this.uniqueID;
    component.changeDetectorRef.detectChanges();
  }

  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    var dragMouseDown = (e) => {
        e.preventDefault();
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        //opacity animation on drag - start
        if(this.Animation){
            document.getElementById(elmnt.id).style.opacity = "0.2";
        }

        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag; 
    }

    var elementDrag = (e)=> {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    var closeDragElement = ()=> {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;

        //opacity animation on drag - start
        if(this.Animation){
            document.getElementById(elmnt.id).style.opacity = "1";
        }
    }

        /* Set draggable by draggable class*/
        (<HTMLElement>(document.getElementById(elmnt.id).getElementsByClassName("draggable")[0])).onmousedown = dragMouseDown;
  }

  TouchDragElement(element) {
    // AddListener to every touch event
    element.addEventListener("touchstart", this.touchHandler, true);
    element.addEventListener("touchmove", this.touchHandler, true);
    element.addEventListener("touchend", this.touchHandler, true);
    element.addEventListener("touchcancel", this.touchHandler, true);
  }

  touchHandler(event) {
    var touch = event.changedTouches[0];
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
  }

}
