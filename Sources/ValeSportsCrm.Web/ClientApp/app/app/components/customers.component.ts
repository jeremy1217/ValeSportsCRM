import { Component, OnInit } from "@angular/core";
import { ITdDataTableColumn } from "@covalent/core";
import { ICustomer } from "../models/state.model";
import { IPageChangeEvent } from "@covalent/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../reducers";
import * as App from "../actions/app";

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
    selector: "customers",
    templateUrl: "./customers.component.html"
})
export class CustomersComponent implements OnInit {
    public items: Store<ICustomer[]>;

    constructor(private _store: Store<fromApp.IState>) {
        this.items = _store.select(fromApp.selectCustomers);
    }

    public columns: ITdDataTableColumn[] = [
        { name: "firstName", label: "First name" },
        { name: "lastName", label: "Last name" },
        { name: "birthDate", label: "Date of Birth" },
        { name: "address", label: "Address" },
        { name: "phone", label: "Phone" },
        { name: "email", label: "Email" },
        { name: "id", label: "Actions" }
    ];

    ngOnInit() { }

    create() {
        this._store.dispatch(new App.CustomerCreate());
    }

    edit(id: string) {
        this._store.dispatch(new App.CustomerOpen({ id: id }));
    }

    page(pagingEvent: IPageChangeEvent): void {

    }
}
