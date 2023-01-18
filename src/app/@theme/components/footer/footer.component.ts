import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b>ILMSI</b> 2023
    </span>
  `,
})
export class FooterComponent {
}
