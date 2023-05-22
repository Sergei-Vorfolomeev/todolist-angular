import { Component, Input } from '@angular/core'

@Component({
  selector: 'tl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() addedDate!: string
}
