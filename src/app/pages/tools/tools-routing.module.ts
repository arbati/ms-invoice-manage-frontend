import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListToolsComponent } from './list-tools/list-tools.component';
import { ToolsComponent } from './tools.component';

const routes: Routes = [{
  path: '',
  component: ToolsComponent,
  children: [
    {
      path: 'list',
      component: ListToolsComponent,
    }
  ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
