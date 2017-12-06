import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home.component";
import { CustomersComponent } from "./components/customers.component";
import { ProgramsComponent } from "./components/programs.component";
import { Conditional } from "@angular/compiler";

export const routes: Routes = [
    { path: "", redirectTo: "customers/1", pathMatch: "full" },
    {
        path: "",
        component: HomeComponent,
        children: [
            {
                path: "customers/:page",
                component: CustomersComponent
            },
            {
                path: "programs/:page",
                component: ProgramsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }