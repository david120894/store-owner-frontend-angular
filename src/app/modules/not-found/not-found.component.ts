import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  @Input() errorMessage: string = 'Page not found';
  constructor() {
  }
  ngOnInit(){
  }

}
