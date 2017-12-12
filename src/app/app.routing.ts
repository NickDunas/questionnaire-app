import { Routes } from '@angular/router';
import { QuestionnairesIndexComponent } from './questionnaires/questionnaires-index/questionnaires-index.component';
import { QuestionnairesShowComponent } from './questionnaires/questionnaires-show/questionnaires-show.component';
import { SectionsShowComponent } from './sections/sections-show/sections-show.component';
import { QuestionnairesLaunchComponent } from './questionnaires/questionnaires-launch/questionnaires-launch.component';

export const Routing: Routes = [
  { path: '', redirectTo: '/questionnaires', pathMatch: 'full' },
  { path: 'questionnaires', component: QuestionnairesIndexComponent },
  { path: 'questionnaires/launch/:id', component: QuestionnairesLaunchComponent },
  { path: 'questionnaires/:id', component: QuestionnairesShowComponent },
  { path: 'sections/:id', component: SectionsShowComponent }
];
