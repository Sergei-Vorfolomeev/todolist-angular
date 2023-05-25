import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TodosComponent } from 'app/features/todos/components/todos.component'
import { AuthGuard } from 'app/core/guards/auth.guard'

const routes: Routes = [
  { path: '', component: TodosComponent, pathMatch: 'full', canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
