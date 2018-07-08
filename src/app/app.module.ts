import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
//Module - 
import { MultipleDraggableModalsModule } from 'multiple-draggable-modals';
//Component which you would like to use as a modal - 
import { ExampleModalComponent } from './example-modal.component';

@NgModule({
  declarations: [AppComponent,ExampleModalComponent], // <--
  imports: [BrowserModule,
    MultipleDraggableModalsModule, // <--
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ExampleModalComponent] // <--
})
export class AppModule { }
