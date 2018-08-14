import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Prescription } from '../prescriptions';
import { DataService } from '../data.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  prescriptions: Prescription[];
  prescription: any = {};
  angForm: FormGroup;
  editMode = true;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder) {
      this.iniForm();
    }
    
    iniForm() {
      this.angForm = this.fb.group({
        rx: ['', Validators.required ],
        name: ['', Validators.required ],
        dosage: ['', Validators.required ],
        quantity: ['', Validators.required ],
        vendor: ['', Validators.required ],
        price: ['', Validators.required ],
        refill: ['', Validators.required ],
        url: ['', Validators.required ]
      });   
    }

    ngOnInit() {
      this.getPrescription();
    }

    transformDate(date) {
      return formatDate(date, 'yyyy-MM-dd', 'en');
    }

    getPrescription() {
      this.route.params.subscribe(params => {
        this.dataService.editPrescription(params['id']).subscribe(res => {
          this.prescription = res;
            console.log(res);

            const rdate = this.prescription.refill;
            const fdate = this.transformDate(rdate) 
          this.createForm(fdate);
        });
      });
    }

    createForm(date) {
      let rx = '';
      let name = '';
      let dosage = '';
      let quantity = '';
      let vendor = '';
      let price = '';
      let refill = '';
      let url = '';

      

      if (this.editMode) {
        this.angForm.get('rx').setValue(this.prescription.rx);
        this.angForm.get('name').setValue(this.prescription.name);
        this.angForm.get('dosage').setValue(this.prescription.dosage);
        this.angForm.get('quantity').setValue(this.prescription.quantity);
        this.angForm.get('vendor').setValue(this.prescription.vendor);
        this.angForm.get('price').setValue(this.prescription.price);
        this.angForm.get('refill').setValue(date);
            

        this.angForm.get('url').setValue(this.prescription.url);
      
      }
     
    }
    
    updatePrescription(rx, name, dosage, quantity, vendor, price, refill, url) {
      this.route.params.subscribe(params => {
        this.dataService.updatePrescription(rx, name, dosage, quantity, vendor, price, refill, url, params['id']);
        
      setTimeout(() => {this.dataService
        .getPrescriptions()
        .subscribe((data: Prescription[]) => {
        this.prescriptions = data;})}, 1000)

      setTimeout(() => {this.router.navigate(['/index']);}, 2000)
      
    });
    }  
  
}
