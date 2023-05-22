import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from 'app/features/todos/services/tasks.service'
import { Observable } from 'rxjs'
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

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getTasks(this.todolistId)
  }
}
