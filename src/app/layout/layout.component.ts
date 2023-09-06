import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @Input('matBadgeColor')
  color: ThemePalette

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(url: string)
  {
    this._router.navigate([url])
  }

}
