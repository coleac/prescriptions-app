import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Prescription } from  '../prescriptions'
import { formatDate } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-prescription-table',
  templateUrl: './prescription-table.component.html',
  styleUrls: ['./prescription-table.component.css']
})

export class PrescriptionTableComponent implements OnInit {
  prescriptions: Prescription[];

  constructor(private dataService: DataService,) {}


  transformDate(date) {
    return formatDate(date, 'yyyy-MM-dd', 'en');
  }

  ngOnInit() {
    this.dataService
      .getPrescriptions()
      .subscribe((data: Prescription[]) => {
      this.prescriptions = data;

      /*
      var num: number = this.prescriptions.length;
      var i: number;
      
      for (i < num; i >= 0; i--) {
        if (i == 0){
          console.log('loop 0');
          console.log(this.prescriptions['0'].refill);
          let rdate = this.prescriptions['0'].refill;
          this.prescriptions['0'].refill = moment(rdate).format("L");
        }
        else{
          console.log(i);
          console.log('loop i');
          console.log(this.prescriptions);
          console.log(this.prescriptions[i]);
          console.log(this.prescriptions['0']);
          let rdate = this.prescriptions[i].refill;
          console.log(this.prescriptions[i].refill);
          this.prescriptions[i].refill = new Date(moment(rdate).format("L"));
          }
        
      }*/
        
        
      });
  }

  deletePrescription(id) {
    this.dataService.deletePrescription(id).subscribe(res => {
      console.log('Deleted');
      this.dataService
      .getPrescriptions()
      .subscribe((data: Prescription[]) => {
      this.prescriptions = data;
      });

    });
  }
  
}