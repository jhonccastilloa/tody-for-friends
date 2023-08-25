import { Component, ViewChild, HostListener } from '@angular/core';
import { Item, NgxWheelComponent } from 'ngx-wheel';
import { fromEvent, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(NgxWheelComponent, { static: false }) wheel!: NgxWheelComponent;
  size: number = 600;
  spinDuration: number = 2;
  values: string = 'Tomo \nTomamos \nToman \nIzquierda \nDerecha \nObliga';
  items: Item[] = [];
  resizeObservable$: Observable<Event> = fromEvent(window, 'resize');
  optionWin: Item = {
    text: '',
    fillStyle: '',
    id: null,
  };
  before() {
    console.log('before');
  }
  after() {
    Swal.fire({
      title: ' ¡ ' + this.optionWin.text + ' !',
      imageUrl: '../assets/images/96x96.png',
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Ok, Reiniciar',
    });
  }
  ngOnInit() {
    this.transformData();
    this.size = window.innerWidth <= 644 ? 400 : 600;
    this.resizeObservable$.subscribe(() => {
      this.size = window.innerWidth <= 644 ? 400 : 600;
    });
  }

  transformData() {
    const splitValues = this.values.split('\n');
    this.items = splitValues
      .filter((el) => el.trim())
      .map((value, key) => ({
        text: value.trim(),
        id: key,
        fillStyle: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
      }));
  }
  async onGenerateWheel() {
    this.transformData();
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.wheel.reset();
  }

  OnPlayWheel() {
    const randomId = Math.floor(Math.random() * this.items.length);
    this.wheel.reset();
    this.wheel.idToLandOn = randomId;
    this.optionWin = this.items[randomId];
    this.wheel.spin();
  }
}
