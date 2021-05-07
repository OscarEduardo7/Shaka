var att = require('dynamodb-data-types').AttributeValue;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var uuid = require('uuid');
const cors = require('cors');
//para credenciales de AWS
const aws_keys = require('./creeds');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');


//para identificadores unicos
var uuid = require('uuid');
var corsOptions = { origin: true, optionsSuccessStatus: 200};

app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

var port = 9000;
app.listen(port);
console.log('Servidor listo en el puerto ',port);

//AWS
//instanciamos el SDK de aws
var AWS = require('aws-sdk');
AWS.config.update(aws_keys.dynamodb);
//instanciamos los servicios que vamos a utilizar
const Dynamo = new AWS.DynamoDB(aws_keys.dynamodb);
const s3 = new AWS.S3(aws_keys.s3);
const rek = new AWS.Rekognition(aws_keys.rekognition);
const translate = new AWS.Translate(aws_keys.translate);
const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito);

const fs = require('fs')
AWS.config.apiVersions = {
  polly: '2016-06-10',
  // other service API versions
};

const polly = new AWS.Polly(aws_keys.polly);



//peticion docClient
app.get("/nuevos", function(req, res){
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: 'persona',
    Key: {
      "id": "1"
    }
  };

  docClient.get(params, function (err, data) {
      if (err) {
          res.send(err);
          console.log(err)
      } else {
          res.send(data);
          console.log(data);
      }
  });
});

//este no se toca. - obtener usuario para login
app.post("/login2", function(req, res){
  let body = req.body;
  let usuario = body.userName;
  let contra = body.contra;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    Key: {
      'userName': usuario,
    },
    TableName: 'Usuarios',
  };

  docClient.get(params, function (err, data) {
      if (err) {
          res.send(err);
          console.log(err)
      } else {
        if(data.Item == null){
          res.send("vacio")
          console.log("vacio")
        }else{
          res.send(data);
          console.log(data);
        }

      }
  });
});


//este no se toca.. / actualizar usuario
app.put("/editarUsuario", function(req, res){
  let body = req.body;
  let usuario = body.userName;
  let nombre = body.nombre;
  let apellido = body.apellido;
  let foto = body.foto

  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: 'Usuarios',
    Key: {
      'userName': usuario
    },
    UpdateExpression: "set nombre= :nom, apellido= :las, foto= :miF",
    ExpressionAttributeValues:{
      ":nom": nombre,
      ":las": apellido,
      ":miF": foto
    },
    ReturnValues: "UPDATED_NEW"
  };

  docClient.update(params, function (err, data) {
      if (err) {
          res.send("Nel");
      } else {
          res.send(data);
      }
  });
});

//este no se toca... / obtener Albumes de un usuario especifico
app.post("/getAlbumes", function(req, res){
  let body = req.body;
  let usuario = body.userName;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: 'Albumes',
    FilterExpression : 'idUser = :n',
    ExpressionAttributeValues : {':n' : usuario}
  };

  docClient.scan(params, function (err, data) {
      if (err) {
          res.send(err);
          console.log(err)
      } else {
          res.send(data);
          //console.log(data);
      }
  });
});

//este no se toca---- CREAR ALBUM NUEVO -----
app.post("/newAlbum", function(req, res){
  let body = req.body;
  let usuario = body.userName;
  let titulo = body.titulo;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var input ={
    'id': usuario+"_"+titulo,
    'idUser': usuario,
    'titulo': titulo
  }

  var params = {
    TableName: 'Albumes',
    Item: input
  };

  docClient.put(params, function (err, data) {
      if (err) {
          res.send(err);
          console.log("noCreado");
      } else {
          res.send("Creado");
      }
  });
});

//este no se toca---- ELIMINAR ALBUM -----
app.post("/deleteAlbum", function(req, res){
  let body = req.body;
  let usuario = body.userName;
  let titulo = body.titulo;

  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: 'Albumes',
    Key: {
      "id": usuario+"_"+titulo
    }
  };

  docClient.delete(params, function (err, data) {
      if (err) {
          res.send(err);
          console.log("no se elimino");
      } else {
          res.send(data);
          console.log("eliminado");
      }
  });
});

app.post("/new", function(req, res){
    let body = req.body;
    
    let name = body.nombre;

    Dynamo.putItem({
        TableName: "persona",
        Item: {
        "id": { S: uuid() },
        "nombre": { S: name },
        }
    }, function (err, data) {
        if (err) {
        console.log('Error saving data:',err);
        res.send({ 'message': 'ddb failed' });
        } else {
        console.log('Save success: ',data);
        res.send({ 'message': 'ddb success' });
        }
    });
});

app.get("/usuarios", function(req, res){
    let params = {
        TableName: 'persona',
        Limit: 50
    };
    
    Dynamo.scan(params, function(err, data){
      if(err){
          console.log("Error", err);
      }  else{
          res.send(data.Items);
          
          /*var resumeAttrVal = {
            count: {"N": "4" },
            languages: { "SS": ["Java Script", "Ruby", "GLSL", "C" ] }
          };
          
          console.log(JSON.stringify(att.unwrap(resumeAttrVal)));*/
      }
    });
});

app.get("/usuario", function(req, res){
    var params = {
        TableName: 'persona',
        Key: {
          'id': {S: "1"}
        },
        ProjectionExpression: 'nombre'   //Este es solo para obtener un dato en especifico
      };
      
      Dynamo.getItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Item);
          res.json(data.Item);
        }   
      });
    
});

//------Registrar usuario-------------
app.post("/register", function(req, res){
  let body = req.body;
  let usuario = body.userName;
  let nombre = body.nombre;
  let apellido = body.apellido;
  let contra = body.contra;
  let foto = body.foto;

  var docClient = new AWS.DynamoDB.DocumentClient();

  var input = {
    'userName': usuario,
    'nombre': nombre,
    'apellido': apellido,
    'contra': contra,
    'foto': foto
  }

  var params = {
    TableName: 'Usuarios',
    Item: input
  };

  docClient.put(params, function (err, data) {
      if (err) {
          res.send(err);
          console.log(err);
          console.log("user save error");
      } else {
        res.send("success");
        console.log("user save success");
        //console.log(res);
        console.log(res.data);
        console.log(usuario + " creado");
      }
  });
});

//Amazon Cognito
app.post("/login", async (req, res) => {
  var crypto = require('crypto');
  var hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
  var authenticationData = {
      Username: req.body.username,
      Password: hash+"D**"
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
  );
  var userData = {
      Username: req.body.username,
      Pool: cognito,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');

  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          // User authentication was successful
          res.json(result); //
      },
      onFailure: function (err) {
          // User authentication was not successful
          res.json(err);
      },
      mfaRequired: function (codeDeliveryDetails) {
          // MFA is required to complete user authentication.
          // Get the code from user and call
          cognitoUser.sendMFACode(verificationCode, this);
      },
  });
});

app.post("/signup", async (req, res) => {
  var attributelist = [];

  var dataname = {
      Name: 'name',
      Value: req.body.name,
  };
  var attributename = new AmazonCognitoIdentity.CognitoUserAttribute(dataname);

  attributelist.push(attributename);

  var dataemail = {
      Name: 'email',
      Value: req.body.email,
  };
  var attributeemail = new AmazonCognitoIdentity.CognitoUserAttribute(dataemail);

  attributelist.push(attributeemail);

  var datanickname = {
    Name: 'nickname',
    Value: req.body.nickname,
  };
  var attributenickname = new AmazonCognitoIdentity.CognitoUserAttribute(datanickname);
  attributelist.push(attributenickname);

  var crypto = require('crypto');
  var hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
  console.log(attributelist);

  cognito.signUp(req.body.username, hash+"D**", attributelist, null, async (err, data) => {
      
      if (err) {
          console.log(err);

          res.json(err.message || err);
          return;
      }
      console.log(data);
      res.json(req.body.username+' registrado');
  });
});


app.post("/polly", async (req, res) =>{
  let body = req.body;
  let texto = body.text;
  let voz = body.voz;
  let lan = body.lan;

  console.log(texto);
  const input = {
    Text: texto, //"Hello Polly",
    OutputFormat: "mp3",
    VoiceId: voz,// "Miguel",//"Joanna",
    LanguageCode: lan//"es-MX"
  }
  
  polly.synthesizeSpeech(input, (err, data) =>{
    if(err){
      console.log(err)
      return
    }
    if (data.AudioStream instanceof Buffer){
      fs.writeFile('hello.mp3', data.AudioStream, (fsErr) =>{
        if(fsErr){
          console.error(fsErr)
          console.log(fsErr)
          return
        }
        console.log('Success');
        res.send("success");
      })
    }
  });
});


