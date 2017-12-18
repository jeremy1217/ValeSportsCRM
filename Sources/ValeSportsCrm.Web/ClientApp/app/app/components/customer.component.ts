import { Component, OnInit } from "@angular/core";
import { ICustomer, ISport } from "../models/state.model";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromApp from "../reducers";
import * as App from "../actions/app";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: "customer",
    templateUrl: "./customer.component.html",
    styleUrls: ["customer.component.css"]
})
export class CustomerComponent implements OnInit {
    public form: FormGroup;
    public item$: Store<ICustomer>;
    public sports$: Store<ISport[]>;

    constructor(private _formBuilder: FormBuilder,
        private _store: Store<fromApp.IState>) {

        this.form = this._formBuilder.group({
            id: "",
            firstName: ["", [Validators.required, Validators.maxLength(100)]],
            lastName: ["", [Validators.required, Validators.maxLength(100)]],
            birthDate: "",
            address: ["", [Validators.maxLength(300)]],
            phone: ["", [Validators.maxLength(20)]],
            email: ["", [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            sports: ""
        });

        this.sports$ = _store.select(fromApp.selectSports);

        this.item$ = _store.select(fromApp.selectCustomer);
        this.item$.subscribe(m => {
            if (m) {
                this.form.setValue({
                    id: m.id,
                    firstName: m.firstName,
                    lastName: m.lastName,
                    birthDate: m.birthDate,
                    address: m.address,
                    phone: m.phone,
                    email: m.email,
                    sports: m.sports
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
