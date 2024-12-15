import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PositionComponent } from "./postion/position.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PositionComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gps-app';
}
