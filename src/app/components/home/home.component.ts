import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentDay:number = Date.now();

  constructor(
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
  }

  createNewList()
  {
    this.router.navigate(['/', 'Lists','-1','Edit']);;

  }
  viewAllLists()
  {
    this.router.navigate(['/', 'Lists']);
  }
  viewAllItems()
  {
    this.router.navigate(['/', 'Items']);
  }
}
