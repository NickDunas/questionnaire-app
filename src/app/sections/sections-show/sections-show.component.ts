import { Component, OnInit } from '@angular/core';
import { Section } from '../../__common/models/Section.model';
import { Question } from '../../__common/models/Question.model';
import { ResourcesService } from '../../resources.service';
import { SnotifyService } from 'ng-snotify';
import { ActivatedRoute } from '@angular/router';
import { APIItemResponse } from '../../__common/models/APIItemResponse.model';

@Component({
  selector: 'app-sections-show',
  templateUrl: './sections-show.component.html',
  styleUrls: ['./sections-show.component.css']
})
export class SectionsShowComponent implements OnInit {
  public item: Section;
  public questions: Question[];
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

      this.getSection();
    });
  }

  getSection() {
    const id = this.id;
    this.loadingResource = true;

    this.resourcesService.getItem('section', id).subscribe(
      (response: APIItemResponse) => {
        this.item = response.data;
        this.loadingResource = false;
      },
      error => {
        this.loadingResource = false;
        this.snotifyService.error(
          'Unable to load sections. Please try again.',
          'Ooops..!'
        );
      }
    );
  }
}
