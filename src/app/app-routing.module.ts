import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home/vendor-home.component';
import { ProductHomeComponent } from './product/product-home/product-home.component';
import { GeneratorComponent } from '@app/po/generator/generator.component';
import { PoviewerComponent } from './poviewer/poviewer.component';

const routes: Routes = [
{ path: 'home', component: HomeComponent, title: 'CaseStudy - Home' },
{ path: 'vendors', component: VendorHomeComponent, title: 'CaseStudy - Vendors' },
{ path: 'products', component: ProductHomeComponent, title: 'CaseStudy - Products' },
{ path: 'generator', component: GeneratorComponent, title: 'CaseStudy - Generator' },
{path: 'poviewer', component: PoviewerComponent, title: 'CaseStudy - PoViewer'},
{ path: '', component: HomeComponent }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
