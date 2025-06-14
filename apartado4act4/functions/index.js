/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

exports.crearUsuario = functions.https.onRequest(async (req, res) => {
  const {uid, nombre, email, edad} = req.body;

  if (!nombre || !email || edad === undefined) {
    return res.status(400).json({error: "Faltan campos requeridos"});
  }

  try {
    const edadInt = parseInt(edad);
    if (isNaN(edadInt)) {
      return res.status(400).json({error: "La edad debe ser un número"});
    }

    const docRef = await admin.firestore().collection("perfiles").doc(uid).set({
      uid,
      nombre,
      email,
      edad: edadInt,
      creadoEn: new Date().toISOString(),
    });

    return res.status(200).json({mensaje: "Perfil creado", uid: docRef.id});
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({error: "No se pudo crear el perfil"});
  }
});
//NECESARIO QUE HAGA EL DEPLOY DE LA FUNCION AL CAMBIARLA PORQUE SINO LA CONSULTA
//NO FUNCIONARA Y NO SE REALIZARÁ LA INSERCION.

// Crear Producto
exports.crearProducto = functions.https.onRequest(async (req, res) => {
  const {nombre, descripcion, precio, stock} = req.body;

  if (!nombre || !descripcion || !precio || !stock) {
    return res.status(400).json({error: "Faltan campos requeridos"});
  }

  try {
    const docRef = await admin.firestore().collection("productos").add({
      nombre,
      descripcion,
      precio,
      stock,
      creadoEn: new Date().toISOString(),
    });

    return res.status(200).json({mensaje: "Producto creado", id: docRef.id});
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({error: "No se pudo crear el producto"});
  }
});

// Crear Compra
exports.crearCompra = functions.https.onRequest(async (req, res) => {
  const {uidUsuario, producto, precio, estadoPago} = req.body;

  if (!uidUsuario || !producto || !precio || !estadoPago) {
    return res.status(400).json({error: "Faltan campos requeridos"});
  }

  try {
    const docRef = await admin.firestore().collection("compras").add({
      uidUsuario,
      producto,
      precio,
      estadoPago,
      fecha: new Date().toISOString(),
    });

    return res.status(200).json({mensaje: "Compra registrada", id: docRef.id});
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({error: "No se pudo registrar la compra"});
  }
});

exports.obtenerUsuariosPorEdad = functions.https.onRequest(async (req, res) => {
  const edadMin = parseInt(req.query.edad);

  if (isNaN(edadMin)) {
    return res.status(400).json({error: "Edad no válida"});
  }

  try {
    const snapshot = await admin.firestore()
        .collection("perfiles")
        .where("edad", ">=", edadMin)
        .get();

    const resultados = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(resultados);
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    return res.status(500).json({error: "No se pudo filtrar por edad"});
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/*
Completada subida de archivo especifico en storage y atribuido permiso al usuario para poder 
visualizarlo
*/