import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'
import { map, Observable } from 'rxjs'
import { Task, TasksResponse } from 'app/features/todos/models/tasks.models'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(todolistId: string): Observable<Task[]> {
    return this.http
      .get<TasksResponse>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`)
      .pipe(map(el => el.items))
  }
}
