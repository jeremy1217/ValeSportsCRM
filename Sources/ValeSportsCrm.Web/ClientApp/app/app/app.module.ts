import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";

import {
  CovalentLayoutModule, CovalentDataTableModule, CovalentPagingModule,
  CovalentStepsModule, CovalentDialogsModule, CovalentCommonModule, CovalentExpansionPanelModule,
  CovalentLoadingModule, CovalentSearchModule, CovalentNotificationsModule,
  CovalentMenuModule, CovalentMessageModule, CovalentMediaModule
} from "@covalent/core";

import { StoreModule, ActionReducer, combineReducers } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { AppEffects } from "./effects/app.effects";
import { reducers } from "./reducers";

import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./components/home.component";
import { CustomersComponent } from "./components/customers.component";
import { ProgramsComponent } from "./components/programs.component";
import { CustomerComponent } from "./components/customer.component";
import { ProgramComponent } from "./components/program.component";
import { UsersComponent } from "./components/users.component";
import { UserComponent } from "./components/user.component";
import { CustomerApiService } from "./services/customer-api.service";

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,

    AppRoutingModule,

    StoreModule.forFeature("app", reducers),
    EffectsModule.forFeature([
      AppEffects
    ]),
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    CovalentLayoutModule, CovalentDataTableModule, CovalentPagingModule,
    CovalentStepsModule, CovalentDialogsModule, CovalentCommonModule, CovalentExpansionPanelModule,
    CovalentLoadingModule, CovalentSearchModule, CovalentNotificationsModule,
    CovalentMenuModule, CovalentMessageModule, CovalentMediaModule
  ],
  declarations: [
    HomeComponent,
    CustomersComponent,
    ProgramsComponent,
    CustomerComponent,
    ProgramComponent,
    UserComponent,
    UsersComponent
  ],
  providers: [CustomerApiService],
  bootstrap: []
})
export class AppModule { }