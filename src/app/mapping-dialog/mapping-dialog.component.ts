import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mapping-dialog',
  templateUrl: './mapping-dialog.component.html',
  styleUrls: ['./mapping-dialog.component.scss']
})
export class MappingDialogComponent {
  @Input() columnNames: string[] = [];
  @Input() predefinedArray: string[] = [];
  @Output() mappingConfirmed = new EventEmitter<{ [key: string]: string }>();

  mapping: { [key: string]: string } = {};

  confirmMapping() {
    this.mappingConfirmed.emit(this.mapping);
  }
}
