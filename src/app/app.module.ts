import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SummaryComponent } from './components/summary/summary.component';


@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,

  ],
  imports: [
    BrowserModule,
    NzGridModule,
    NzTableModule,
    NzIconModule,
    NzTagModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide : NZ_I18N,useValue:en_US}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
