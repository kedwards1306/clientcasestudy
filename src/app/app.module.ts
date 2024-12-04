import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app specific
import { MatComponentsModule } from './mat-components/mat-components.module';
import { HomeComponent } from './home/home.component';
import { VendorModule } from './vendor/vendor.module';
@NgModule({
imports: [
BrowserModule,
AppRoutingModule,
BrowserAnimationsModule,
MatComponentsModule,
VendorModule,
],
providers: [ provideHttpClient(withFetch()) ],
bootstrap: [AppComponent],
declarations: [AppComponent, HomeComponent],
})
export class AppModule { }