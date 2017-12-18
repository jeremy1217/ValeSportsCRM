import { Component, OnInit } from "@angular/core";
import { ITdDataTableColumn } from "@covalent/core";
import { IProgram } from "../models/state.model";
import { IPageChangeEvent } from "@covalent/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../reducers";
import * as App from "../actions/app";

@Component({
    selector: "programs",
    templateUrl: "./programs.component.html"
})
export class ProgramsComponent implements OnInit {
    public items$: Store<IProgram[]>;

    constructor(private _store: Store<fromApp.IState>) {
        this.items$ = _store.select(fromApp.selectPrograms);
    }

    public columns: ITdDataTableColumn[] = [
        { name: "name", label: "Name" },
        { name: "type", label: "Type" },
        { name: "startDate", label: "Start Date" },
        { name: "endDate", label: "End Date" },
        { name: "address", label: "Address" },
        { name: "price", label: "Price" },
        { name: "id", label: "Actions" }
    ];

    ngOnInit() { }

    create() {
        this._store.dispatch(new App.ProgramCreate());
    }

    edit(id: string) {
        this._store.dispatch(new App.ProgramOpen({ id: id }));
    }

    page(pagingEvent: IPageChangeEvent): void {

    }
}
