import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {

  prescriptionsUrl = 'http://ec2-52-36-5-209.us-west-2.compute.amazonaws.com:3000/prescriptions';

  constructor(
    private _http: HttpClient) { }
  

  addPrescription(rx, name, dosage, quantity, vendor, price, refill, url) {
    const formObj = {
      rx: rx,
      name: name,
      dosage: dosage,
      quantity: quantity,
      vendor: vendor,
      price: price,
      refill: refill,
      url: url
    };
    this._http.post(`${this.prescriptionsUrl}/add/`, formObj)
      .subscribe(res => console.log('Done'));
  }

  getPrescriptions() {
    return this
      ._http
      .get(`${this.prescriptionsUrl}`);
  }

  editPrescription(id) {
    return this
      ._http
      .get(`${this.prescriptionsUrl}/edit/${id}`);
  }

  updatePrescription(rx, name, dosage, quantity, vendor, price, refill, url, id) {
    const obj = {
      rx: rx,
      name: name,
      dosage: dosage,
      quantity: quantity,
      vendor: vendor,
      price: price,
      refill: refill,
      url: url
    };
    this._http
    .post(`${this.prescriptionsUrl}/update/${id}`, obj)
    .subscribe(res => console.log('Done'));
  }

  deletePrescription(id) {
    return this
      ._http
      .get(`${this.prescriptionsUrl}/delete/${id}`);
  }
}
