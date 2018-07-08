import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'multiple-draggable-modals',
  template: `<ng-template #modalsContainer></ng-template>`
})
export class MultipleDraggableModalsComponent {
  
  @ViewChild('modalsContainer', { read: ViewContainerRef }) container;    
  Component;

  constructor(private componentFactoryResolver:ComponentFactoryResolver) { 
    this.Component = ModalComponent;
  }

  AddModal(componentType, data:any = {}, backdrop = false, escape = false, animation = true, center = true, position:{Top:string, Left:string} = {Top:"10%", Left:"10%"}) {
    // Create component 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.Component);
    const component = this.container.createComponent(componentFactory);
    //Set component data
    var uniqueID = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    component.instance.uniqueID = uniqueID;
    component.instance.Self = component;
    component.instance.Component = componentType;
    component.instance.Data = data;
    component.instance.Center = center;
    component.instance.Position = position;
    component.instance.ModalBackdrop = backdrop;
    component.instance.ModalEscape = escape;
    component.instance.Animation = animation;

    //returns the modal uniqueID for future use.
    return uniqueID;
  }

  RemoveModal(modalId){
    (<HTMLElement>(document.getElementById("modal-" + modalId).getElementsByClassName("close")[0])).click();
  }

  RemoveAll() {
    this.container.clear();
  }

}
