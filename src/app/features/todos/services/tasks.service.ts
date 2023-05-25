import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'environments/environment'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import {
  DomainTasks,
  GetTasksResponse,
  Task,
  UpdateTaskModel,
} from 'app/features/todos/models/tasks.models'
import { CommonResponse } from 'app/core/models/core.models'
import { NotificationService } from 'app/core/services/notification.service'
import { ResultCodeEnum } from 'app/core/enums/resultCode.enum'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  tasks$ = new BehaviorSubject<DomainTasks>({})

  getTasks(todolistId: string) {
    this.http
      .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`)
      .pipe(
        map(el => el.items),
        catchError(this.handleError.bind(this))
      )
      .subscribe(tasks => {
        const state = this.tasks$.getValue()
        state[todolistId] = tasks
        this.tasks$.next(state)
      })
  }

  createTask(data: { todolistId: string; title: string }) {
    this.http
      .post<CommonResponse<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${data.todolistId}/tasks`,
        {
          title: data.title,
        }
      )
      .pipe(
        map(res => {
          if (res.resultCode === ResultCodeEnum.success) {
            const state = this.tasks$.getValue()
            const newTask = res.data.item
            state[data.todolistId] = [newTask, ...state[data.todolistId]]
            return state
          } else {
            this.notificationService.handleError(res.messages[0])
            return EMPTY
          }
        }),
        catchError(this.handleError.bind(this))
      )
      .subscribe(state => this.tasks$.next(<DomainTasks>state))
  }
  deleteTask(data: { todolistId: string; taskId: string }) {
    this.http
      .delete<CommonResponse>(
        `${environment.baseUrl}/todo-lists/${data.todolistId}/tasks/${data.taskId}`
      )
      .pipe(
        map(res => {
          if (res.resultCode === ResultCodeEnum.success) {
            const state = this.tasks$.getValue()
            state[data.todolistId] = state[data.todolistId].filter(el => el.id !== data.taskId)
            return state
          } else {
            this.notificationService.handleError(res.messages[0])
            return EMPTY
          }
        })
      )
      .subscribe(state => this.tasks$.next(<DomainTasks>state))
  }
  changeTask(data: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    this.http
      .put<CommonResponse<Task>>(
        `${environment.baseUrl}/todo-lists/${data.todolistId}/tasks/${data.taskId}`,
        data.model
      )
      .pipe(
        map(() => {
          const state = this.tasks$.getValue()
          state[data.todolistId] = state[data.todolistId].map(el =>
            el.id === data.taskId ? { ...el, ...data.model } : el
          )
          return state
        })
      )
      .subscribe(tasks => this.tasks$.next(tasks))
  }
  handleError(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}
