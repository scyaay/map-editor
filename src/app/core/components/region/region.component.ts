import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Coords } from '../../../models/coords';
import { Observable } from '../../../../../node_modules/rxjs';
import { CursorQuery } from '../../state/cursor/cursor.query';

export interface PointMoveStart {
  pointIndex: number;
  pos: Coords;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-region]',
  template: `
      <svg:polygon class="app-area" [ngClass]="{'active': active}" [attr.points]="svgPoints"/>
      <ng-template *ngIf="editing" ngFor let-i="index" let-point [ngForOf]="points">
        <svg:circle *ngIf="active"
          [ngClass]="{'grabbing': (cursorGrabbing | async)}"
          (mousedown)="initMove($event, i)"
          (contextmenu)="deletePoint($event, i)"
          class="app-drag-circle"
          [attr.cx]="point.x"
          [attr.cy]="point.y"
          r="2"
          fill="red"/>
      </ng-template>
	`,
  styleUrls: ['./region.component.scss']
})
export class RegionComponent {
  @Input() points: Coords[] = [];
  @Input() editing = true;
  @Input() active = false;

  @Output() removePoint = new EventEmitter<number>();
  @Output() initPointMove = new EventEmitter<PointMoveStart>();

  cursorGrabbing: Observable<boolean>;

  constructor(cursorQuery: CursorQuery) {
    this.cursorGrabbing = cursorQuery.grabbing();
  }

  get svgPoints(): string {
    return this.points
      .map(p => `${p.x},${p.y} `)
      .reduce((acc, p) => acc + p, '');
  }

  deletePoint(event: MouseEvent, index: number) {
    event.preventDefault();
    this.removePoint.emit(index);
  }

  initMove(event: MouseEvent, index: number) {
    console.log('init move');
    this.initPointMove.emit({
      pos: { x: event.clientX, y: event.clientY },
      pointIndex: index
    });
    event.preventDefault();
  }
}
