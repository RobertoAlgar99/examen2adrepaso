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
  const {nombre, email, edad} = req.body;

  if (!nombre || !email || edad === undefined) {
    return res.status(400).json({error: "Faltan campos requeridos"});
  }

  try {
    const edadInt = parseInt(edad);
    if (isNaN(edadInt)) {
      return res.status(400).json({error: "La edad debe ser un número"});
    }

    const docRef = await admin.firestore().collection("perfiles").add({
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


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
