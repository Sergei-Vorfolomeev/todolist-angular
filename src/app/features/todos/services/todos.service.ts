import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'
import { Todo } from 'app/features/todos/models/todos.models'
import { BehaviorSubject, filter, map } from 'rxjs'
import { CommonResponse } from 'app/core/models/core.models'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  todos$ = new BehaviorSubject<Todo[]>([])

  getTodos() {
    this.http.get<Todo[]>(`${environment.baseUrl}/todo-lists`).subscribe(res => {
      this.todos$.next(res)
    })
  }
  createTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(
        map(res => {
          const stateTodos = this.todos$.getValue()
          const newTodo = res.data.item
          return [newTodo, ...stateTodos]
        })
      )
      .subscribe(todos => this.todos$.next(todos))
  }
  deleteTodo(todolistId: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/todo-lists/${todolistId}`)
      .pipe(
        map(res => {
          if (res.resultCode === 0) return this.todos$.getValue().filter(el => el.id !== todolistId)
          else throw new Error()
        })
      )
      .subscribe(res => this.todos$.next(res))
  }
}
