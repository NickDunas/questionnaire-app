import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../__common/models/Question.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnotifyService } from 'ng-snotify';
import { ResourcesService } from '../../resources.service';
import { APIItemResponse } from '../../__common/models/APIItemResponse.model';
import { InputTypesRegistry } from '../../__common/classes/inputTypes.class';

@Component({
  selector: 'app-questions-add',
  templateUrl: './questions-add.component.html',
  styleUrls: ['./questions-add.component.css']
})
export class QuestionsAddComponent implements OnInit {
  public syncingResource = false;
  public mode = 'post';
  public resourceFormGroup: FormGroup;
  public item: Question;
  public section_id: number;
  public inputTypes: any[];

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private snotifyService: SnotifyService,
    private resourcesService: ResourcesService
  ) {
    this.initResourceForm();
    this.initInputTypes();
  }

  ngOnInit() {
    if (this.item) {
      this.initResourceFormValues();
    }
  }

  initResourceForm() {
    this.resourceFormGroup = this.formBuilder.group({
      input_type: ['', [Validators.required]],
      available_values: [''],
      text: ['', [Validators.required]]
    });
  }

  initInputTypes() {
    this.inputTypes = InputTypesRegistry.availableTypes();
  }

  initResourceFormValues() {
    this.resourceFormGroup.controls['input_type'].setValue(
      this.item.input_type
    );
    this.resourceFormGroup.controls['text'].setValue(this.item.text);
    this.resourceFormGroup.controls['available_values'].setValue(this.item.available_values);
  }

  postQuestion() {
    const payload = this.resourceFormGroup.value;
    payload.section_id = this.section_id;
    payload.input_type = +payload.input_type;
    this.syncingResource = true;

    this.resourcesService.postItem('question', payload).subscribe(
      (response: APIItemResponse) => {
        this.snotifyService.success(
          'The question has been successfully created.',
          'Success!'
        );
        this.supplyItem(response.data);
        this.syncingResource = false;
      },
      error => {
        this.snotifyService.error(
          'Unable to save question. Please try again.',
          'Ooops..!'
        );
        this.syncingResource = false;
      }
    );
  }

  patchQuestion() {
    const payload = this.resourceFormGroup.value;
    payload.id = this.item.id;
    payload.section_id = this.section_id;
    payload.input_type = +payload.input_type;
    this.syncingResource = true;

    this.resourcesService.patchItem('question', payload).subscribe(
      (response: APIItemResponse) => {
        this.snotifyService.success(
          'The question has been successfully updated.',
          'Success!'
        );
        this.supplyItem(response.data);
        this.syncingResource = false;
      },
      error => {
        this.snotifyService.error(
          'Unable to update question. Please try again.',
          'Ooops..!'
        );
        this.syncingResource = false;
      }
    );
  }

  supplyItem(item: Question) {
    this.item = item;
    this.ngbActiveModal.close(this.item);
  }

  onSaveQuestion() {
    this.mode === 'post' ? this.postQuestion() : this.patchQuestion();
  }

  onCloseModal() {
    this.ngbActiveModal.close(null);
  }
}
