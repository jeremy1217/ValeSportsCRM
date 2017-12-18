import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home.component";
import { CustomersComponent } from "./components/customers.component";
import { CustomerComponent } from "./components/customer.component";
import { ProgramsComponent } from "./components/programs.component";
import { ProgramComponent } from "./components/program.component";
import { UsersComponent } from "./components/users.component";
import { UserComponent } from "./components/user.component";
import { Conditional } from "@angular/compiler";

export const routes: Routes = [
    { path: "", redirectTo: "customers", pathMatch: "full" },
    {
        path: "",
        component: HomeComponent,
        children: [
            {
                path: "customers",
                component: CustomersComponent
            },
            {
                path: "customer/:id",
                component: CustomerComponent
            },
            {
                path: "programs",
                component: ProgramsComponent
            },
            {
                path: "program/:id",
                component: ProgramComponent
            },
            {
                path: "users",
                component: UsersComponent
            },
            {
                path: "user/:id",
                component: UserComponent
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
