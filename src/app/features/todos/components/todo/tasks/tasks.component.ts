import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from 'app/features/todos/services/tasks.service'
import { combineLatest, map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from 'app/features/todos/models/tasks.models'
import { TodosService } from 'app/features/todos/services/todos.service'
import { TaskStatusesEnum } from 'app/core/enums/taskStatuses.enum'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private tasksService: TasksService, private todosService: TodosService) {}

  @Input() todolistId!: string

  tasks$!: Observable<Task[]>
  taskTitle = ''

  ngOnInit(): void {
    this.tasksService.getTasks(this.todolistId)

    // this.tasks$ = this.tasksService.tasks$.pipe(
    //   map(tasks => {
    //     return tasks[this.todolistId]
    //   })
    // )
    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const tasks = res[0]
        let tasksForTodo = tasks[this.todolistId]

        const todo = res[1]
        const activeTodo = todo.find(el => el.id === this.todolistId)

        if (activeTodo?.filter === 'completed') {
          tasksForTodo = tasksForTodo.filter(el => el.status === TaskStatusesEnum.completed)
        }
        if (activeTodo?.filter === 'active') {
          tasksForTodo = tasksForTodo.filter(el => el.status === TaskStatusesEnum.active)
        }
        return tasksForTodo
      })
    )
  }

  addTaskHandler() {
    this.tasksService.createTask({ todolistId: this.todolistId, title: this.taskTitle })
    this.taskTitle = ''
  }

  deleteTask(taskId: string) {
    this.tasksService.deleteTask({ todolistId: this.todolistId, taskId })
  }

  changeTask(data: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    this.tasksService.changeTask(data)
  }
}
