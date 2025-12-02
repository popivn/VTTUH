import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { SubHeaderComponent } from "../sub-header/sub-header.component";
@Component({
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    imports: [HeaderComponent, FooterComponent,RouterOutlet, SubHeaderComponent],
})
export class MainLayoutComponent {
}