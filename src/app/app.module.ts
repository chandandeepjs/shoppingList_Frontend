import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from "ngx-bootstrap";
import { AppRoutingModule } from './app-routing.module';
 

import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component';
 

 
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { NgxPaginationModule } from "ngx-pagination";
import { Angular2TokenService } from 'angular2-token';
 


import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NguiMapModule } from "@ngui/map";

import { AllServicesService } from "./all-services.service";

//import { MilitarytimeToLocaltimePipe } from './militarytime-to-localtime.pipe';
import { CapitalizePipe } from './capitalize.pipe';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';


import { NotFoundComponent } from './not-found/not-found.component';

import { ShopAddComponent } from './shop-add/shop-add.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';


import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
   AppComponent,
     
   ShopListComponent,
   ShopAddComponent,
    
   
    CapitalizePipe,
     
    NotFoundComponent,
     
     
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
     
    NgxLocalStorageModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxPaginationModule,

    NgbModule,
    NguiMapModule.forRoot({
      apiUrl:
        "https://maps.google.com/maps/api/js?sensor=true&key=AIzaSyCSblqhuttE7ZRr50ViHtTr6VfWmFsjghU&libraries=places,visualization,drawing&language=en-US"
    }),
     
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    GooglePlaceModule,
    Ng4GeoautocompleteModule.forRoot(),


  ],
  providers: [
    AllServicesService,
    //AuthGuard,
    //JwtHelperService,
    //Angular2TokenService,
    //{ provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
