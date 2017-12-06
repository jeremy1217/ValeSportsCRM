import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "app", pathMatch: "full" },
    {
        path: "app",
        loadChildren: "./app/app.module#AppModule",
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }