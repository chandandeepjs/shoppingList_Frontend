import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';

import { Angular2TokenService } from 'angular2-token';

import { CapitalizePipe } from './../capitalize.pipe';

import { environment } from './../../environments/environment';

import { AllServicesService } from './../all-services.service';


 


@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css']
})
export class ShopAddComponent implements OnInit {
  @ViewChild('imageInput')
  public resturantData;
  imageInputVariable: ElementRef;
  selectedFile;
  itemImagefilename;
  filee;
  categoryList =[];
  subCategoryList = [];
  public addShopForm = this.FormBuilder.group({
    shopName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]{2,}$')]],
    category: ['', [Validators.required,Validators.pattern('^[A-Za-z ]{2,}$')]],// Validators.pattern('^[0-9]{1,10}$')
    Address: ['',[Validators.required]],
    ownerName: ['', [Validators.required,Validators.pattern('^[A-Za-z ]{2,}$')]],
  });
  public formSubmitAttempt: boolean = false;
  public loadingAnimationDiv: boolean = false;
  public addMenuError: object = {};
  public addMenuResp;
  public iteamImageText;
  public isAPIError: boolean = false;
  public isAPISuccess: boolean = false;

  public locationData:object ={};
  constructor(config: NgbModalConfig,
    public modalService: NgbModal,
    //public modalRef: NgbModalRef,
    public apiService: AllServicesService,
    public router: Router,
    public route: ActivatedRoute,
    public FormBuilder: FormBuilder,
    public _storageService: LocalStorageService) {

    }

  ngOnInit() {
    
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
  handleAddressChange(data: any): any { 
    let componentData1 = JSON.parse(JSON.stringify(data));
    console.log("data",componentData1.formatted_address,componentData1.formatted_address);
    this.locationData['lat'] = componentData1.geometry.location.lat;
    this.locationData['lng'] = componentData1.geometry.location.lng;
    //this.locationData['utc_offset'] = componentData1.data.utc_offset;
    this.locationData['formattedAddress'] = componentData1.formatted_address;
    this.locationData['dataStringify'] = JSON.stringify(data); //console.log("==componentData1==", this.locationData);

    console.log("data===",this.locationData,componentData1.formatted_address,componentData1.formatted_address);
  }
  addMenuSubmit() {
    this.formSubmitAttempt = true;
    this.addMenuError = {};
    this.addMenuResp = '';
    if (this.addShopForm.valid) {
      let formData = new FormData();
      let coordinates = [this.locationData['lng'],this.locationData['lat']];
      formData.append('shopName', this.addShopForm.value.shopName);
      formData.append('category', this.addShopForm.value.category);
      //formData.append('Address', this.addShopForm.value.Address);
      formData.append('Address', this.locationData['formattedAddress']);
      formData.append('ownerName', this.addShopForm.value.ownerName);
      formData.append('coordinates',JSON.stringify(coordinates));
      this.menuItemAPI('/Shop/create', formData);
    } else {
      return false;
    }
  }
   
   

  menuItemAPI(apiLink, formData) {
    this.loadingAnimationDiv = true;
    this.apiService.postImageAPIServices(apiLink, formData, true).subscribe(result => {
      this.addMenuResp = result;
      this.loadingAnimationDiv = false;
      this.resetForm();
      this.isAPIError = false;
      this.isAPISuccess = true;
    }, err => {
        this.addMenuError = JSON.parse(err._body);
      this.loadingAnimationDiv = false;
        this.isAPIError = true;
        this.isAPISuccess = false;
    })
  }
   

}
