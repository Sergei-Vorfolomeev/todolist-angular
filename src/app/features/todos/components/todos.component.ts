import { Component, OnInit } from '@angular/core'
import { TodosService } from 'app/features/todos/services/todos.service'
import { Observable } from 'rxjs'
import { DomainTodo } from 'app/features/todos/models/todos.models'
import { AuthService } from 'app/core/services/auth.service'

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService, private authService: AuthService) {}

  todos$ = new Observable<DomainTodo[]>()
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

  logoutHandler() {
    this.authService.logout()
  }
}
