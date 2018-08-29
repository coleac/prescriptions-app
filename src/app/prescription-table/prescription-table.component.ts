import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Prescription } from  '../prescriptions';
import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../core/user.model';
import { DatePipe, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';


@Component({
  selector: 'app-prescription-table',
  templateUrl: './prescription-table.component.html',
  providers: [ CurrencyPipe, DatePipe, DecimalPipe, PercentPipe ],
  styleUrls: ['./prescription-table.component.css']
})

export class PrescriptionTableComponent implements OnInit {
  prescriptions: Prescription[];

  refillDue(refill) {
    let refill1 = Date.parse(refill);
    console.log(refill);
    let pipe = new DatePipe('en-US');
    let now = Date.now()
    console.log(now);
    let today = pipe.transform(now, 'shortDate');
    let refill2 = Date.parse(today);

    if(refill1 >= refill2){
      return true;
    }
    else{
      return false;
    }
  }


  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
      private dataService: DataService, 
      private route: ActivatedRoute,
    ) {}


  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data1 = routeData['data'];
      if (data1) {
        this.user = data1;
      }
    })
    this.dataService
      .getPrescriptions(this.user.email)
      .subscribe((data: Prescription[]) => {
      this.prescriptions = data;  
    })    
  }

  deletePrescription(id) {
    this.dataService.deletePrescription(id).subscribe(res => {
      console.log('Deleted');
      this.dataService
      .getPrescriptions(this.user.email)
      .subscribe((data: Prescription[]) => {
      this.prescriptions = data;
      });
    });
  }

  webMD(url) {
    window.open(url);
  }
}
