import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { Subscription } from 'rxjs/Subscription';
import { NgbModalConfig, NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../../environments/environment';
import { AllServicesService } from './../all-services.service';

import { CapitalizePipe } from './../capitalize.pipe';


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  DefaultPageLimit: number;
  totalNumberOfPages: number;
  public shopError: object = {};
  public shopItemResp;

  public loadingAnimationDiv: boolean = false;   
  currentPageNumber: number;
  
  public shopAPILink: string ="/Shop/list?" ;
   
  public locationData:object ={};
  public formSubmitAttempt: boolean = false;
  public addShopForm = this.FormBuilder.group({
    shopName: [''],
    Address: [''],     
  });

  constructor(public apiService: AllServicesService,
    config: NgbModalConfig,
    public modalService: NgbModal,
    public router: Router,
    public route: ActivatedRoute,
    public FormBuilder: FormBuilder,
    public _storageService: LocalStorageService,
    ) {
      this.DefaultPageLimit = environment.DefaultPageLimit;
     
    }

  ngOnInit() {
    this.getshopItemlist(this.shopAPILink+ 'skip=0&limit=' + this.DefaultPageLimit, {});

  }
   
  getshopItemlist(apiLink, formData) {
    this.loadingAnimationDiv = true;
    this.apiService.getAPIServices(apiLink, formData, false).subscribe(result => {
      this.totalNumberOfPages = result.data.totalCount;
      this.shopItemResp = result.data.list;
      this.loadingAnimationDiv = false;
    }, (err: any) => {
        this.shopItemResp = []
      this.shopError = err;
        this.loadingAnimationDiv = false;
    })
  }
  shopItemPageChange(pageNimber) {
    let skip = this.DefaultPageLimit * (pageNimber - 1);
    let paramQ= this.shopAPILink+ 'skip=' + skip + '&limit=' + this.DefaultPageLimit;
    if(this.locationData['shopName'] &&this.locationData['shopName']!=''){
      paramQ=paramQ+'&shopName='+this.locationData['shopName']
    }
    if(this.locationData['lat'] &&this.locationData['lng']){
      let coordinates = [this.locationData['lng'],this.locationData['lat']];
      paramQ=paramQ+'&lat='+this.locationData['lat'];
      paramQ=paramQ+'&long='+this.locationData['lng'];
    }; 
    this.getshopItemlist(paramQ, {});
  }
  resetForm() {
    this.addShopForm.reset();
    for (let i in this.addShopForm.controls) {
      this.addShopForm.controls[i].setErrors(null);
    }
  }
  validateFormKey(key) {
    return this.addShopForm.get(key);
  }
  addMenuSubmit() { 
    let paramQ= this.shopAPILink+ 'skip=0&limit=' + this.DefaultPageLimit;
    if(this.addShopForm.valid && this.addShopForm.value.shopName ){    
      this.locationData['shopName']=this.addShopForm.value.shopName;      
      paramQ= paramQ+'&shopName='+this.locationData['shopName'];
    } 
    if(this.addShopForm.valid && this.addShopForm.value.Address!='' && this.locationData['lat'] && this.locationData['lng'] ){ 
      if(this.locationData['lat'] &&this.locationData['lng']){
        let coordinates = [this.locationData['lng'],this.locationData['lat']];
        paramQ=paramQ+'&lat='+this.locationData['lat'];
        paramQ=paramQ+'&long='+this.locationData['lng'];
      }; 
    }else if(this.addShopForm.valid && this.addShopForm.value.Address=='' ){ 
      delete this.locationData['lng']; delete this.locationData['lat'];
    };  
    this.getshopItemlist(paramQ, {}); 
  }
  handleAddressChange(data: any): any { 
    let componentData1 = JSON.parse(JSON.stringify(data));
    this.locationData['lat'] = componentData1.geometry.location.lat;
    this.locationData['lng'] = componentData1.geometry.location.lng;
    //this.locationData['utc_offset'] = componentData1.data.utc_offset;
    this.locationData['formattedAddress'] = componentData1.formatted_address;
    this.locationData['dataStringify'] = JSON.stringify(data);
  }
}
