import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FilterType } from 'app/features/todos/models/todos.models'

@Component({
  selector: 'tl-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() filter!: FilterType
  @Output() changeFilterEvent = new EventEmitter<FilterType>()

  changeFilterHandler(filter: FilterType) {
    this.changeFilterEvent.emit(filter)
  }
}
