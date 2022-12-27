import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent {

  @Input() title: string;
  @Input() value: string|number;

}
