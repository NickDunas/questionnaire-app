import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routing } from './app.routing';
import { AppComponent } from './app.component';
import { QuestionnairesIndexComponent } from './questionnaires/questionnaires-index/questionnaires-index.component';
import { QuestionnairesAddComponent } from './questionnaires/questionnaires-add/questionnaires-add.component';
import { ResourcesService } from './resources.service';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { LoaderComponent } from './__common/componentes/loader/loader.component';
import { QuestionnairesShowComponent } from './questionnaires/questionnaires-show/questionnaires-show.component';
import { SectionsIndexComponent } from './sections/sections-index/sections-index.component';
import { SectionsAddComponent } from './sections/sections-add/sections-add.component';
import { SectionsShowComponent } from './sections/sections-show/sections-show.component';
import { SortByPipe } from './__common/pipes/sortBy.pipe';
import { DndModule } from 'ng2-dnd';
import { QuestionsIndexComponent } from './questions/questions-index/questions-index.component';
import { QuestionsAddComponent } from './questions/questions-add/questions-add.component';
import { QuestionsShowComponent } from './questions/questions-show/questions-show.component';
import { InputTypePipe } from './__common/pipes/inputType.pipe';
import { QuestionnairesLaunchComponent } from './questionnaires/questionnaires-launch/questionnaires-launch.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnairesIndexComponent,
    QuestionnairesAddComponent,
    LoaderComponent,
    QuestionnairesShowComponent,
    SectionsIndexComponent,
    SectionsAddComponent,
    SectionsShowComponent,
    SortByPipe,
    QuestionsIndexComponent,
    QuestionsAddComponent,
    QuestionsShowComponent,
    InputTypePipe,
    QuestionnairesLaunchComponent
  ],
  exports: [
    InputTypePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(Routing),
    NgbModule.forRoot(),
    SnotifyModule,
    DndModule.forRoot()
  ],
  providers: [
    ResourcesService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    QuestionnairesAddComponent,
    SectionsAddComponent,
    QuestionsAddComponent
  ]
})
export class AppModule {}
