import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ExcelService } from './excel.service';
import { MappingDialogComponent } from './mapping-dialog/mapping-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MappingDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    BrowserAnimationsModule,

  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
