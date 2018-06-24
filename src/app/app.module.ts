import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PanelComponent } from "./panel/panel.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatProgressBarModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HowitworksComponent } from './howitworks/howitworks.component';

@NgModule({
  declarations: [AppComponent, PanelComponent, HowitworksComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
