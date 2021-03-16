const express = require('express')
const bodyParser = require("body-parser");
const TronWeb = require('tronweb');



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

var usuariobuscado = 'TB7RTxBPY4eMvKjceXj8SWjVnZCrWr4XvF';

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

app.get('/consultar/ejemplo', async(req,res) => {

    usuario = await user.find({ direccion: usuariobuscado }, function (err, docs) {});

    console.log(usuario);

    res.send(usuario[0]);

});

app.post('/', async(req,res) => {

    console.log(req.body);

    res.send(req.body);

});


app.get('/consultar/:direccion', async(req,res) => {

    let cuenta = req.params.direccion;

    usuario = await user.find({ direccion: cuenta }, function (err, docs) {});

    console.log(usuario);

    res.send(usuario[0]);

});

app.get('/registrar/:direccion', async(req,res) => {

    let cuenta = req.params.direccion;
    let respuesta = {};
    respuesta.status = "200";

    usuario = await user.find({ direccion: cuenta }, function (err, docs) {});

    //res.send(usuario);

    //console.log(await TronWeb.isAddress(cuenta));


    if (await TronWeb.isAddress(cuenta)) {

        if ( usuario != "" ) {
            respuesta.status = "303";
            respuesta.txt = "Cuenta ya registrada";
            respuesta.usuario = usuario[0];

            res.send(respuesta);

        }else{

             var users = new user({ 
                direccion: cuenta,
                registered: false,
                sponsor: cuenta,
                exist: true,
                ethereum: '',
                eth: false,
                rango: 0,
                recompensa: false,
                nivel: [0,0,0,0,0,0,0,0,0,0],
                balanceTrx: 0,
                withdrawnTrx: 0,
                investedWozx: 0,
                withdrawnWozx: 0,
                wozxPendig: 0,
                p: false
            });

            users.save().then(() => {
                respuesta.status = "300";
                respuesta.txt = "Usuario creado exitodamente";
                respuesta.usuario = users;

                res.send(respuesta);
            });

        }
    }else{
        respuesta.txt = "Ingrese una direccion de TRX";
        res.send(respuesta);
    }

    


    

});


app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))