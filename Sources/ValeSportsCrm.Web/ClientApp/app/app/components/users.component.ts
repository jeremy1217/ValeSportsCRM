import { Component, OnInit } from "@angular/core";
import { ITdDataTableColumn } from "@covalent/core";
import { IUser } from "../models/state.model";
import { IPageChangeEvent } from "@covalent/core";

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
    selector: "users",
    templateUrl: "./users.component.html"
})
export class UsersComponent implements OnInit {
    constructor() { }

    public columns: ITdDataTableColumn[] = [
        { name: "userName", label: "User name" },
        { name: "firstName", label: "First name" },
        { name: "lastName", label: "Last name" },
        { name: "email", label: "Email" },
        { name: "phone", label: "Phone" },
        { name: "role", label: "Role" },
        { name: "id", label: "Actions" }
    ];

    public items: IUser[] = [
        {
            id: "1",
            userName: "User1",
            firstName: "John",
            lastName: "Smith",
            phone: "1800123456",
            email: "qwe@asd.com",
            role: "User",
            password: null
        },
        {
            id: "1",
            userName: "User1",
            firstName: "John",
            lastName: "Smith",
            phone: "1800123456",
            email: "qwe@asd.com",
            role: "User",
            password: null
        },
        {
            id: "1",
            userName: "User1",
            firstName: "John",
            lastName: "Smith",
            phone: "1800123456",
            email: "qwe@asd.com",
            role: "User",
            password: null
        },
        {
            id: "1",
            userName: "User1",
            firstName: "John",
            lastName: "Smith",
            phone: "1800123456",
            email: "qwe@asd.com",
            role: "User",
            password: null
        },
        {
            id: "1",
            userName: "User1",
            firstName: "John",
            lastName: "Smith",
            phone: "1800123456",
            email: "qwe@asd.com",
            role: "User",
            password: null
        }
    ];

    ngOnInit() { }

    create() { }

    page(pagingEvent: IPageChangeEvent): void {

    }
}
