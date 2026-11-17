import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { HeroesComponent } from './heroes/heroes';

export const routes: Routes = [
  { path: '', component: DashboardComponent, title: 'Dashboard · Hero HQ' },
  { path: 'heroes', component: HeroesComponent, title: 'Heroes · Hero HQ' },
  { path: '**', redirectTo: '' },
];
