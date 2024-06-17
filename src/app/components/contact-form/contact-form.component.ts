import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, NgTemplateOutlet],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  public formSubmitted: boolean = false;

  public contactUsForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    emailAddress: new FormControl(null, [Validators.required, Validators.email]),
    queryType: new FormControl(null, [Validators.required]),
    userMessage: new FormControl(null, [Validators.required]),
    userConsent: new FormControl(null, [Validators.required])
  });

  constructor() {}


  public onSubmit(): void {
    this.formSubmitted = true;
    console.log(this.contactUsForm);
    if (this.contactUsForm.valid) {
      this.formSubmitted = false;
      this.clearForm();
      this.displayFormSuccess();
    }
  }

  public displayFormSuccess(): void {
    const toast = document.getElementById('success-toast');
    if (toast) {
      toast.classList.add('active');
      setTimeout(() => {toast.classList.remove('active')}, 5000);
    }
  }

  public clearForm(): void {
    const formControls = this.contactUsForm.controls;
    Object.keys(formControls).forEach((key) => {
      this.contactUsForm.get(key)?.setValue(null);
    });
  }

}
