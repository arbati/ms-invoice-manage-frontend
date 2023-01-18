import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-invoice',
  template: `
  <router-outlet></router-outlet>
`,
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
