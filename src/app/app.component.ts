import { Component, ViewChild } from '@angular/core';
import { Item, NgxWheelComponent } from 'ngx-wheel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(NgxWheelComponent, { static: false }) wheel!: NgxWheelComponent;
  idToLandOn = 1;
  width = 600;
  height = 600;
  spinDuration = 8;
  values: string = 'Tomo \nTomamos \nToman \nIzquierda \nDerecha \nObliga';
  items: Item[] = [];

  before() {
    console.log('before');
  }
  after() {
    console.log('after');
  }
  ngOnInit() {
    this.transformData();
  }
  transformData() {
    const splitValues = this.values.split('\n');
    this.items = splitValues.map((value, key) => ({
      text: value.trim(),
      id: key,
      fillStyle: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
    }));
  }
  onGenerateWheel() {
    this.wheel.reset();
  }
  onBlur() {
    this.transformData();
  }
  OnPlayWheel() {
    this.wheel.spin();
  }
}
