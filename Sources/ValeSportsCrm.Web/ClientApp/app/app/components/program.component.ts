import { Component, OnInit } from "@angular/core";
import { IProgramType, IProgram } from "../models/state.model";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromApp from "../reducers";
import * as App from "../actions/app";

@Component({
    selector: "program",
    templateUrl: "./program.component.html"
})
export class ProgramComponent implements OnInit {
    public form: FormGroup;
    public item$: Store<IProgram>;
    public types$: Store<IProgramType[]>;

    constructor(private _formBuilder: FormBuilder,
        private _store: Store<fromApp.IState>) {

        this.form = this._formBuilder.group({
            id: "",
            name: ["", [Validators.required, Validators.maxLength(100)]],
            startDate: "",
            endDate: "",
            price: "",
            type: ""
        });

        this.types$ = _store.select(fromApp.selectProgramTypes);

        this.item$ = _store.select(fromApp.selectProgram);
        this.item$.subscribe(m => {
            if (m) {
                this.form.setValue({
                    id: m.id,
                    name: m.name,
                    type: m.type,
                    startDate: m.startDate,
                    endDate: m.endDate,
                    price: m.price
                });
            } else {
                this.form.reset();
            }
        });
    }

    ngOnInit() { }

    save() {
        this._store.dispatch(new App.CustomerSave(this.form.value));
    }

    cancel() {
        this.form.reset();
        this._store.dispatch(new App.CustomerCancel());
    }
}
