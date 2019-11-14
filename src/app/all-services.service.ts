import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
//import { CookieService } from 'ngx-cookie';
import 'rxjs/Rx';
//import 'rxjs/add/operator/catch';
//import { catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';

import { LocalStorageService } from 'ngx-localstorage';

console.info('environment===',environment);

@Injectable()
export class AllServicesService {
   public showCouter: boolean = true;
   public accesstoken;
   public siteId;
   public apiUrl = environment.APIEndpoint;

   public defaultImage: string = "";
   public restaurantAccessToken: string;
   constructor(
      public http: Http,
      public _storageService: LocalStorageService
   ) {
      this.restaurantAccessToken = this._storageService.get('restaurantAccessToken');
   }

   postAPIServices(apiLink, data, isHeader: boolean) {
      const headers = new Headers();
      const body = JSON.stringify(data);
      headers.append('Content-Type', 'application/json');
      if (isHeader) {
         this.restaurantAccessToken = this._storageService.get('restaurantAccessToken');
         headers.append('Authorization', this.restaurantAccessToken);
      };
      return this.http.post(this.apiUrl +apiLink, body, { headers: headers }).map((data: Response) => data.json());
   }

   getAPIServices(apiLink, data: any, isHeader: boolean) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (isHeader) {
         this.restaurantAccessToken = this._storageService.get('restaurantAccessToken'); 
         headers.append('Authorization', this.restaurantAccessToken);
      };
      return this.http.get(this.apiUrl + apiLink, { headers: headers }).map((data: Response) => data.json());
   }
   putAPIServices(apiLink, data: any,isHeader:boolean) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (isHeader){
         headers.append('Authorization', this.restaurantAccessToken);
      };
      const body = JSON.stringify(data); console.log("body", body);
      return this.http.put(this.apiUrl + apiLink, body, { headers: headers }).map((result: Response) => result.json());
   }
   postImageAPIServices(apiLink, data, isHeader: boolean) {
      const headers = new Headers();
      if (isHeader) {
         this.restaurantAccessToken = this._storageService.get('restaurantAccessToken');
          headers.append('Authorization', this.restaurantAccessToken);
      }
      return this.http.post(this.apiUrl + apiLink, data, { headers: headers }).map((data: Response) => data.json());
   }
}
