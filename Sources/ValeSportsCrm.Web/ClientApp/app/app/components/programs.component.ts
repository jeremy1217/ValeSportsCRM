import { Component, OnInit } from "@angular/core";
import { ITdDataTableColumn } from "@covalent/core";
import { ICustomer, IProgram, ProgramType } from "../models/state.model";
import { IPageChangeEvent } from "@covalent/core";

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
    selector: "programs",
    templateUrl: "./programs.component.html"
})
export class ProgramsComponent implements OnInit {
    constructor() { }

    public columns: ITdDataTableColumn[] = [
        { name: "name", label: "Name" },
        { name: "type", label: "Type" },
        { name: "startDate", label: "Start Date" },
        { name: "endDate", label: "End Date" },
        { name: "address", label: "Address" },
        { name: "price", label: "Price" },
        { name: "id", label: "Actions" }
    ];

    public items: IProgram[] = [
        {
            id: "1",
            name: "Program 1",
            type: ProgramType.Camps,
            startDate: "12/1/2017",
            endDate: "12/12/2017",
            price: 12345,
            customers: []
        },
        {
            id: "1",
            name: "Program 1",
            type: ProgramType.Camps,
            startDate: "12/1/2017",
            endDate: "12/12/2017",
            price: 12345,
            customers: []
        },
        {
            id: "1",
            name: "Program 1",
            type: ProgramType.Camps,
            startDate: "12/1/2017",
            endDate: "12/12/2017",
            price: 12345,
            customers: []
        },

    ];

    ngOnInit() { }

    create() { }

    page(pagingEvent: IPageChangeEvent): void {

    }
}
