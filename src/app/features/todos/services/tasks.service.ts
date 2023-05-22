import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'
import { BehaviorSubject, map } from 'rxjs'
import { DomainTasks, GetTasksResponse, Task } from 'app/features/todos/models/tasks.models'
import { CommonResponse } from 'app/core/models/core.models'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  tasks$ = new BehaviorSubject<DomainTasks>({})

  getTasks(todolistId: string) {
    this.http
      .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`)
      .pipe(map(el => el.items))
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
        map(tasks => {
          const state = this.tasks$.getValue()
          const newTask = tasks.data.item
          state[data.todolistId] = [newTask, ...state[data.todolistId]]
          return state
        })
      )
      .subscribe(state => this.tasks$.next(state))
  }
  deleteTask(data: { todolistId: string; taskId: string }) {
    this.http
      .delete<CommonResponse>(
        `${environment.baseUrl}/todo-lists/${data.todolistId}/tasks/${data.taskId}`
      )
      .pipe(
        map(res => {
          const state = this.tasks$.getValue()
          state[data.todolistId] = state[data.todolistId].filter(el => el.id !== data.taskId)
          return state
        })
      )
      .subscribe(state => this.tasks$.next(state))
  }
}
