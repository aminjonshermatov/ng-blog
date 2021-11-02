import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-login-form-ui',
  templateUrl: './admin-login-form-ui.component.html',
  styleUrls: ['./admin-login-form-ui.component.scss']
})
export class AdminLoginFormUiComponent implements OnInit {

  public formGroup!: FormGroup;

  @Input() formError = '';
  @Output() login = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  };

  public onFormChange(): void {
    this.formError = '';
  }

  public onSubmit(): void {
    this.login.emit(this.formGroup.value);
  }
}
