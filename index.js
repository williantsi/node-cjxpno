const { request, response } = require("express");
const express = require("express");

var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./src/serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://esp8266-4c64e-default-rtdb.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/test");



const app = express();



function teste () {
ref.once("value", function(snapshot) {
  console.log (snapshot.val());
});

}

function teste2() {
  console.log("teste 2");

  
}

app.get("/primeira-rota", (resquest, response) => {
    return response.json({
        message: "Acessou a primeira rota com nodemon"
    });
});

app.get("/teste2", (request, response) => {
  teste2();

  ref.update({
    'testeNode': 'Amazing Grace Bsi 7 Eude'
  });

  return response.json({
    message: "Acessou a primeira rota com teste2"
});
})

app.listen(4002, () => console.log("Servidor está rodando na porta 4002")
);



