import { Component, OnInit } from "@angular/core";
import { ITdDataTableColumn } from "@covalent/core";
import { ICustomer } from "../models/state.model";
import { IPageChangeEvent } from "@covalent/core";

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
    selector: "customers",
    templateUrl: "./customers.component.html"
})
export class CustomersComponent implements OnInit {
    constructor() { }

    public columns: ITdDataTableColumn[] = [
        { name: "photoUrl", label: "", width: 100 },
        { name: "firstName", label: "First name", width: 150 },
        { name: "lastName", label: "Last name", width: { min: 150, max: 250 } },
        { name: "birthDate", label: "Date of Birth" },
        { name: "address", label: "Address" },
        { name: "phone", label: "Phone" },
        { name: "email", label: "Email", width: 250 },
        { name: "id", label: "Actions" }
    ];

    public items: ICustomer[] = [
        {
            id: "1",
            firstName: "John",
            lastName: "Smith",
            birthDate: "12/1/2017",
            address: "NY",
            phone: "1800123456",
            email: "qwe@asd.com",
            sports: [],
            photoUrl: "https://placeimg.com/50/50/people",
            familyMembers: []
        },
        {
            id: "1",
            firstName: "John",
            lastName: "Smith",
            birthDate: "12/1/2017",
            address: "NY",
            phone: "1800123456",
            email: "qwe@asd.com",
            sports: [],
            photoUrl: "https://placeimg.com/50/50/people",
            familyMembers: []
        },
        {
            id: "1",
            firstName: "John",
            lastName: "Smith",
            birthDate: "12/1/2017",
            address: "NY",
            phone: "1800123456",
            email: "qwe@asd.com",
            sports: [],
            photoUrl: "https://placeimg.com/50/50/people",
            familyMembers: []
        },
        {
            id: "1",
            firstName: "John",
            lastName: "Smith",
            birthDate: "12/1/2017",
            address: "NY",
            phone: "1800123456",
            email: "qwe@asd.com",
            sports: [],
            photoUrl: "https://placeimg.com/50/50/people",
            familyMembers: []
        },
        {
            id: "1",
            firstName: "John",
            lastName: "Smith",
            birthDate: "12/1/2017",
            address: "NY",
            phone: "1800123456",
            email: "qwe@asd.com",
            sports: [],
            photoUrl: "https://placeimg.com/50/50/people",
            familyMembers: []
        },

    ];

    ngOnInit() { }

    create() { }

    page(pagingEvent: IPageChangeEvent): void {

    }
}
