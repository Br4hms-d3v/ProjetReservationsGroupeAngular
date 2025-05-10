import {Routes} from '@angular/router';
import {ShowComponent} from './show/show.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {ShowIdComponent} from './show-id/show-id.component';

export const routes: Routes = [
  {path: '', component: ShowComponent},
  {path: 'spectacles', component: ShowComponent},
  {path: 'spectacle/:id', component: ShowIdComponent},
  {path: '**', component: NotFoundPageComponent}
];
