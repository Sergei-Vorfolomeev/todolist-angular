import { Component, OnInit } from '@angular/core'
import { TodosService } from 'app/features/todos/services/todos.service'
import { Observable } from 'rxjs'
import { Todo } from 'app/features/todos/models/todos.models'

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  todos$ = new Observable<Todo[]>()
  newTitle = ''

  ngOnInit(): void {
    this.todosService.getTodos()
    this.todos$ = this.todosService.todos$
  }

  addTodoHandler() {
    this.todosService.createTodo(this.newTitle)
    this.newTitle = ''
  }

  deleteTodo(todolistId: string) {
    this.todosService.deleteTodo(todolistId)
  }

  editTodoTitle(data: { todolistId: string; newTitle: string }) {
    this.todosService.updateTodo(data)
  }
}
