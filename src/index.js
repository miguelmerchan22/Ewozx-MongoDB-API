const express = require('express')
const bodyParser = require("body-parser");


const app = express()
const port = process.env.PORT || 3003


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');

const uri = 'mongodb+srv://userwozx:wozx1234567890@ewozx.neief.mongodb.net/registro';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(uri, options).then(
  () => { console.log("Conectado Exitodamente!");},
  err => { console.log(err); }
);

var user = mongoose.model('usuarios', {
        direccion: String,
        registered: Boolean,
        sponsor: String,
        exist: Boolean,
        ethereum: String,
        eth: Boolean,
        rango: Number,
        recompensa: Boolean,
        nivel: [Number],
        balanceTrx: Number,
        withdrawnTrx: Number,
        investedWozx: Number,
        withdrawnWozx: Number,
        wozxPendig: Number,
        p: Boolean
    
    });

var usuariobuscado = 'david lopez lopez';

var cosa2;

app.get('/', async(req,res) => {

    mongoose.connect(uri, options).then(
      () => { res.send("Conectado a mongoDB Exitodamente!");},
      err => { res.send(err); }
    );


});


app.get('/consultar/todos', async(req,res) => {

    usuario = await user.find({}, function (err, docs) {});

    console.log(usuario);

    res.send(usuario);

});

app.get('/consultar/usuario/ejemplo', async(req,res) => {

    usuario = await user.find({ direccion: usuariobuscado }, function (err, docs) {});

    console.log(usuario);

    res.send(usuario[0]);

});

app.get('/consultar/:direccion', async(req,res) => {

    usuario = await user.find({ direccion: req.params.direccion }, function (err, docs) {});

    console.log(usuario);

    res.send(usuario[0]);

});

app.post('/consultar/usuario', async(req,res) => {

    let cuenta = req.body.cuenta;

    usuario = await user.find({ direccion: cuenta }, function (err, docs) {});

    console.log(usuario);

    res.send(usuario[0]);

});


app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))