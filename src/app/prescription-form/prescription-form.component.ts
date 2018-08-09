import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { DataService } from '../data.service'

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit{
  angForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.prescriptionForm();
  }

  prescriptionForm() {
    this.angForm = this.fb.group({
      rx: ['', Validators.required],
      name: ['', Validators.required],
      dosage: ['', Validators.required],
      quantity: ['', Validators.required],
      vendor: ['', Validators.required],
      price: ['', Validators.required],
      refill: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  addPrescription(rx, name, dosage, quantity, vendor, price, refill, url) {
    this.dataService.addPrescription(rx, name, dosage, quantity, vendor, price, refill, url);
  }

  ngOnInit() {

  }
}