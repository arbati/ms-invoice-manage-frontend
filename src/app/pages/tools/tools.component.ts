import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-tools',
  template: `
  <router-outlet></router-outlet>
`,
})
export class ToolsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
