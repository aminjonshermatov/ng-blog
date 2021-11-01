import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'frontend';
  public counter = 0;


  ngOnInit(): void {
    this.title = 'Awesome app';
  }

  public increase(): void {
    this.counter++;
  }

  public decrease(): void {
    this.counter--;
  }
}
