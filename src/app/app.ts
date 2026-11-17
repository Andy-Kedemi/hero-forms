import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MessagesComponent } from './messages/messages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MessagesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}