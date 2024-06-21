import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {path:'',redirectTo:'/table',pathMatch:'full'},
  {path:'table',component:TableComponent},
  {path:'form',component:FormComponent},
  {path:'form/:id',component:FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
