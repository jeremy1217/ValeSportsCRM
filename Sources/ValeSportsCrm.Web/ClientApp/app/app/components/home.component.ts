import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { TdMediaService } from "@covalent/core";

@Component({
    selector: "home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(public media: TdMediaService,
        private _iconRegistry: MatIconRegistry,
        private _domSanitizer: DomSanitizer) {

        this._iconRegistry.addSvgIconInNamespace("assets", "teradata-ux",
            this._domSanitizer.bypassSecurityTrustResourceUrl("https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/teradata-ux.svg"));
        this._iconRegistry.addSvgIconInNamespace("assets", "covalent",
            this._domSanitizer.bypassSecurityTrustResourceUrl("https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg"));
        this._iconRegistry.addSvgIconInNamespace("assets", "covalent-mark",
            this._domSanitizer.bypassSecurityTrustResourceUrl("https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent-mark.svg"));
    }
    
    ngOnInit() { }
}

