import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'environments/environment'
import { DomainTodo, FilterType, Todo } from 'app/features/todos/models/todos.models'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { CommonResponse } from 'app/core/models/core.models'
import { ResultCodeEnum } from 'app/core/enums/resultCode.enum'
import { NotificationService } from 'app/core/services/notification.service'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  todos$ = new BehaviorSubject<DomainTodo[]>([])

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        map(res => {
          const newTodos: DomainTodo[] = res.map(el => ({ ...el, filter: 'all' }))
          return newTodos
        })
      )
      .subscribe(res => {
        this.todos$.next(res)
      })
  }

  createTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(
        map(res => {
          if (res.resultCode === ResultCodeEnum.success) {
            const stateTodos = this.todos$.getValue()
            const newTodo: DomainTodo = { ...res.data.item, filter: 'all' }
            return [newTodo, ...stateTodos]
          } else {
            this.notificationService.handleError(res.messages[0])
            return this.todos$.getValue()
          }
        }),
        catchError(this.handleError.bind(this))
      )
      .subscribe(todos => this.todos$.next(todos))
  }

  deleteTodo(todolistId: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/todo-lists/${todolistId}`)
      .pipe(
        map(res => {
          if (res.resultCode === ResultCodeEnum.success)
            return this.todos$.getValue().filter(el => el.id !== todolistId)
          else {
            this.notificationService.handleError(res.messages[0])
            return this.todos$.getValue()
          }
        }),
        catchError(this.handleError.bind(this))
      )
      .subscribe(res => this.todos$.next(res))
  }

  updateTodo(data: { todolistId: string; newTitle: string }) {
    this.http
      .put<CommonResponse>(`${environment.baseUrl}/todo-lists/${data.todolistId}`, {
        title: data.newTitle,
      })
      .pipe(
        map(res => {
          if (res.resultCode === ResultCodeEnum.success) {
            return this.todos$
              .getValue()
              .map(el => (el.id === data.todolistId ? { ...el, title: data.newTitle } : el))
          } else {
            this.notificationService.handleError(res.messages[0])
            return this.todos$.getValue()
          }
        }),
        catchError(this.handleError.bind(this))
      )
      .subscribe(res => this.todos$.next(res))
  }

  changeFilter(data: { todolistId: string; filter: FilterType }) {
    const state = this.todos$.getValue()
    const newTodos = state.map(el =>
      el.id === data.todolistId ? { ...el, filter: data.filter } : el
    )
    this.todos$.next(newTodos)
  }

  handleError(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}
