const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

    const app = express();

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Cannot connect to the database'+ err)}
    );

    const prescriptionRoutes = require('./routes/prescription.route');

    app.use(bodyParser.json());
    app.use(cors());
    
    const port = process.env.PORT || 3000;

    app.use('/prescriptions', prescriptionRoutes);

    const server = app.listen(port, function(){
        console.log('Listening on port ' + port);
    });