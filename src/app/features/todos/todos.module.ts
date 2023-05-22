import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TodosComponent } from 'app/features/todos/components/todos.component'
import { TodosRoutingModule } from 'app/features/todos/todos-routing.module'
import { FormsModule } from '@angular/forms'
import { TodoComponent } from './components/todo/todo.component'
import { TasksComponent } from './components/todo/tasks/tasks.component'
import { TaskComponent } from './components/todo/tasks/task/task.component'

@NgModule({
  declarations: [TodosComponent, TodoComponent, TasksComponent, TaskComponent],
  imports: [CommonModule, TodosRoutingModule, FormsModule],
})
export class TodosModule {}
