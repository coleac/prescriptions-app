import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  
  prescriptionsUrl = 'https://ancient-dawn-12248.herokuapp.com/prescriptions';

  constructor(
    private _http: HttpClient) { }
  

  addPrescription(email, rx, name, dosage, quantity, vendor, price, refill, url) {
    const formObj = {
      email: email,
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

  getPrescriptions(email) {
    return this
      ._http
      .get(`${this.prescriptionsUrl}/user/${email}`);
  }

  editPrescription(id) {
    return this
      ._http
      .get(`${this.prescriptionsUrl}/edit/${id}`);
  }

  updatePrescription(email, rx, name, dosage, quantity, vendor, price, refill, url, id) {
    const obj = {
      email: email,
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
