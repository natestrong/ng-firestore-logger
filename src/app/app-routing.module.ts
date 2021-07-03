import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActionsComponent} from "./actions/actions.component";

const routes: Routes = [
  {path: '', component: ActionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
