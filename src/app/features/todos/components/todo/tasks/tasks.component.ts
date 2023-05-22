import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from 'app/features/todos/services/tasks.service'
import { map, Observable } from 'rxjs'
import { Task } from 'app/features/todos/models/tasks.models'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  @Input() todolistId!: string

  tasks$!: Observable<Task[]>
  taskTitle = ''

  ngOnInit(): void {
    this.tasksService.getTasks(this.todolistId)

    this.tasks$ = this.tasksService.tasks$.pipe(
      map(tasks => {
        return tasks[this.todolistId]
      })
    )
  }

  addTaskHandler() {
    this.tasksService.createTask({ todolistId: this.todolistId, title: this.taskTitle })
  }
}
