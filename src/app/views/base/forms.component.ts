import { Component } from '@angular/core';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent {
  max: number;
  rate: number;
  isReadonly: boolean;

  overStar: number | undefined;
  percent: number;

  isCollapsed: boolean;
  iconCollapse: string;

  constructor() {
    this.max = 10;
    this.rate = 7;
    this.isReadonly = false;
    this.isCollapsed = false;
    this.iconCollapse = 'icon-arrow-up';
  }

  // Rating Code Start
  // Rating Code Start
  // Rating Code Start

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }
  // Rating Code End
  // Rating Code End
  // Rating Code End
  // Rating Code End

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
}
