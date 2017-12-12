import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Section } from '../../__common/models/Section.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnotifyService } from 'ng-snotify';
import { ResourcesService } from '../../resources.service';
import { APIItemResponse } from '../../__common/models/APIItemResponse.model';

@Component({
  selector: 'app-sections-add',
  templateUrl: './sections-add.component.html',
  styleUrls: ['./sections-add.component.css']
})
export class SectionsAddComponent implements OnInit {
  public syncingResource = false;
  public mode = 'post';
  public resourceFormGroup: FormGroup;
  public item: Section;
  public questionnaire_id: number;

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private snotifyService: SnotifyService,
    private resourcesService: ResourcesService
  ) {
    this.initResourceForm();
  }

  ngOnInit() {
    if (this.item) {
      this.initResourceFormValues();
    }
  }

  initResourceForm() {
    this.resourceFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  initResourceFormValues() {
    this.resourceFormGroup.controls['name'].setValue(this.item.name);
  }

  postSection() {
    const payload = this.resourceFormGroup.value;
    payload.questionnaire_id = this.questionnaire_id;
    this.syncingResource = true;

    this.resourcesService.postItem('section', payload).subscribe(
      (response: APIItemResponse) => {
        this.snotifyService.success(
          'The section has been successfully created.',
          'Success!'
        );
        this.supplyItem(response.data);
        this.syncingResource = false;
      },
      error => {
        this.snotifyService.error(
          'Unable to save section. Please try again.',
          'Ooops..!'
        );
        this.syncingResource = false;
      }
    );
  }

  patchSection() {
    const payload = this.resourceFormGroup.value;
    payload.id = this.item.id;
    payload.questionnaire_id = this.questionnaire_id;
    this.syncingResource = true;

    this.resourcesService.patchItem('section', payload).subscribe(
      (response: APIItemResponse) => {
        this.snotifyService.success(
          'The section has been successfully updated.',
          'Success!'
        );
        this.supplyItem(response.data);
        this.syncingResource = false;
      },
      error => {
        this.snotifyService.error(
          'Unable to update section. Please try again.',
          'Ooops..!'
        );
        this.syncingResource = false;
      }
    );
  }

  supplyItem(item: Section) {
    this.item = item;
    this.ngbActiveModal.close(this.item);
  }

  onSaveSection() {
    this.mode === 'post' ? this.postSection() : this.patchSection();
  }

  onCloseModal() {
    this.ngbActiveModal.close(null);
  }
}
