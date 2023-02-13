import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './components/profile/profile.component';
<<<<<<< HEAD
import { ItemComponent } from './components/item/item.component';
=======
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthService} from "./services/auth.service";
import {FormModule} from "./components/form/form.module";
import { ProductComponent } from './components/product/product.component';
>>>>>>> 93279d0907ca9b02c5ab8476bcd78a1895c599b8

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ChatComponent,
    ProfileComponent,
<<<<<<< HEAD
    ItemComponent
=======
    ProductComponent
>>>>>>> 93279d0907ca9b02c5ab8476bcd78a1895c599b8
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
