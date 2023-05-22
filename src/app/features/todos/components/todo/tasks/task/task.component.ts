import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, UpdateTaskModel } from 'app/features/todos/models/tasks.models'
import { TaskStatusesEnum } from 'app/core/enums/taskStatuses.enum'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() deleteTaskEvent = new EventEmitter<string>()
  @Output() changeTaskEvent = new EventEmitter<{
    todolistId: string
    taskId: string
    model: UpdateTaskModel
  }>()

  taskStatusesEnum = TaskStatusesEnum

  newTitle = ''
  editMode = false

  deleteTaskHandler() {
    this.deleteTaskEvent.emit(this.task.id)
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked

    const model: UpdateTaskModel = {
      ...this.task,
      status: newStatus ? this.taskStatusesEnum.completed : this.taskStatusesEnum.active,
    }
    this.changeTaskEvent.emit({
      todolistId: this.task.todoListId,
      taskId: this.task.id,
      model,
    })
  }

  changeTaskTitleHandler() {
    const model: UpdateTaskModel = {
      ...this.task,
      title: this.newTitle,
    }
    this.changeTaskEvent.emit({
      todolistId: this.task.todoListId,
      taskId: this.task.id,
      model,
    })
    this.editMode = false
    this.newTitle = ''
  }

  activateEditModeHandler() {
    this.newTitle = this.task.title
    this.editMode = true
  }
}
