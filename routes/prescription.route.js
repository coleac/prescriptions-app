const express = require('express');
const prescriptionRoutes = express.Router();

/* Require Prescription model in our routes module */
let Prescription = require('../models/Prescription');

/* Defined store route */
prescriptionRoutes.route('/add/').post(function (req, res) {
  let prescription = new Prescription(req.body);
  prescription.save()
    .then(item => {
    res.status(200).json({'prescription': 'Prescription added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

/* Defined get data route */
prescriptionRoutes.route('/').get(function (req, res) {
    Prescription.find(function (err, prescriptions){
    if(err){
      console.log(err);
    }
    else {
      res.json(prescriptions);
    }
  });
});

/* Defined edit route */
prescriptionRoutes.route('/edit/:id').get(function (req, res) {
  let _id = req.params.id;
  Prescription.findById(_id, function (err, prescription){
      res.json(prescription);
  });
});

/*  Defined update route */
prescriptionRoutes.route('/update/:id').post(function (req, res) {
    Prescription.findById(req.params.id, function(err, prescription) {
    if (!prescription)
      return next(new Error('Could not load Document'));
    else {
        prescription.rx = req.body.rx;
        prescription.name = req.body.name;
        prescription.dosage = req.body.dosage;
        prescription.quantity = req.body.quantity;
        prescription.vendor = req.body.vendor;
        prescription.price = req.body.price;
        prescription.refill = req.body.refill;
        prescription.url = req.body.url;

        prescription.save().then(prescription => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

/* Defined delete */
prescriptionRoutes.route('/delete/:id').get(function (req, res) {
    Prescription.findByIdAndRemove({_id: req.params.id}, function(err, prescription){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = prescriptionRoutes;