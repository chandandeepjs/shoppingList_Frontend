import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { ShopAddComponent } from './shop-add/shop-add.component';
import { ShopListComponent } from './shop-list/shop-list.component';

 

import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [
    
    { path: '', component: ShopAddComponent },
   
    { path: 'shop-list', component: ShopListComponent },
    {
      path: '**',
      // redirectTo: 'not-found',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })], //, { useHash: true }  { initialNavigation: 'enabled',}
    exports: [RouterModule]
})
export class AppRoutingModule { }