import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../../__common/models/Questionnaire.model';
import { ResourcesService } from '../../resources.service';
import { ActivatedRoute } from '@angular/router';
import { APIItemResponse } from '../../__common/models/APIItemResponse.model';
import { SnotifyService } from 'ng-snotify';
import { Section } from '../../__common/models/Section.model';

@Component({
  selector: 'app-questionnaires-show',
  templateUrl: './questionnaires-show.component.html',
  styleUrls: ['./questionnaires-show.component.css']
})
export class QuestionnairesShowComponent implements OnInit {
  public item: Questionnaire;
  public sections: Section[];
  public loadingResource = false;
  public id: number;
  private subscription: any;

  constructor(
    private resourcesService: ResourcesService,
    private snotifyService: SnotifyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchItemId();
  }

  fetchItemId() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];

      this.getQuestionnaire();
    });
  }

  getQuestionnaire() {
    const id = this.id;
    this.loadingResource = true;

    this.resourcesService.getItem('questionnaire', id).subscribe(
      (response: APIItemResponse) => {
        this.item = response.data;
        this.loadingResource = false;
      },
      error => {
        this.loadingResource = false;
        this.snotifyService.error(
          'Unable to load questionnaire. Please try again.',
          'Ooops..!'
        );
      }
    );
  }
}
