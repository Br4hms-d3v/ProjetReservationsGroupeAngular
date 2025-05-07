import { Routes } from '@angular/router';
import {ShowComponent} from './show/show.component';

export const routes: Routes = [
  {path: '', component: ShowComponent},
  {path: 'spectacles', component: ShowComponent}
];
