import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'visionplus';
  constructor(private router: Router){}
  ngOnInit() {
    console.log("Start front page!")
    this.router.navigateByUrl('/summary');
  }
}
