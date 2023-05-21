import { Component, Input } from '@angular/core'
import { Todo } from 'app/features/todos/models/todos.models'
import { TodosService } from 'app/features/todos/services/todos.service'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  constructor(private todosService: TodosService) {}
  @Input() todo!: Todo

  deleteTodoHandler(todolistId: string) {
    this.todosService.deleteTodo(todolistId)
  }
}
