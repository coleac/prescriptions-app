import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { DataService } from '../data.service'
import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../core/user.model';


@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit{
  angForm: FormGroup;

  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    private dataService: DataService, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) 
  {
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

  addPrescription(email, rx, name, dosage, quantity, vendor, price, refill, url) {
    this.dataService.addPrescription(email, rx, name, dosage, quantity, vendor, price, refill, url);
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    })
  }
}