import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  inSubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Updating clip.';
  @Output() update = new EventEmitter()

  clipID = new FormControl<any>('');
  title = new FormControl<any>('', [Validators.required, Validators.minLength(3)]);

  editForm = new FormGroup({
    title: this.title,
  });

  constructor(private modal: ModalService, private clipService: ClipService) {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) {
      return;
    }
    this.clipID.setValue(this.activeClip.docID ?? null);
    this.title.setValue(this.activeClip.title);

    this.inSubmission = false
    this.showAlert = false
  }

  async submit() {
    if(!this.activeClip){
      return
    }
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong, Try again latee';
      return;
    }
      this.activeClip.title = this.title.value
      this.update.emit(this.activeClip)

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';
  }
}
