import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DomainTodo, FilterType } from 'app/features/todos/models/todos.models'
import { TodosService } from 'app/features/todos/services/todos.service'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  constructor(private todosService: TodosService) {}

  @Input() todo!: DomainTodo
  @Output() deleteTodoEvent = new EventEmitter<string>()
  @Output() deactivateModeEvent = new EventEmitter<{ todolistId: string; newTitle: string }>()

  editMode = false
  newTitle = ''

  deleteTodoHandler() {
    this.deleteTodoEvent.emit(this.todo.id)
  }

  activateEditModeHandler() {
    this.editMode = true
    this.newTitle = this.todo.title
  }

  deactivateEditMode() {
    this.editMode = false
    this.deactivateModeEvent.emit({ todolistId: this.todo.id, newTitle: this.newTitle })
  }

  changeFilter(filter: FilterType) {
    this.todosService.changeFilter({ todolistId: this.todo.id, filter })
  }
}
