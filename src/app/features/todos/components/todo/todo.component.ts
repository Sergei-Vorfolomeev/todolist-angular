import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Todo } from 'app/features/todos/models/todos.models'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo
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
}
