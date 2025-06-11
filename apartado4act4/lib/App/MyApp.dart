import 'package:apartado4act4/Views/homeviewlisten.dart';
import 'package:apartado4act4/Views/logincongoogle.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class Myapp extends StatelessWidget{

  @override
  Widget build(BuildContext context) {
    /*
    Definimos un mapa de rutas para las view de la aplicación.
    El control de las rutas suele permanecer constante.
    */
    Map<String,Widget Function(BuildContext)> rutas = {
      /*
      La función recibe un valor de tipo context, es cual es como la ubicacion
      del widget en el arbol. En concreto el BuildContext que es el objeto que contiene
      este contexto.
      Funcion lambda que recibe un parametro context que en este caso no usa y que,
      devuelve una instancia de homeView, es decir, un widget.
      View = Widget
      */
      
      "/homeViewListen": (context) => Homeviewlisten(),
      "/logincongoogle": (context) => Logincongoogle(),
      
    };

    /*
    Configura y planifica la estructura de la aplicacion.
    initialroute: ruta por la que comenzará la aplicación al ejecutarse, siguiendo
    rutas como el mapa definido con el contexto de cada una de las vistas de la
    aplicación.
    Gestiona la navegación usando rutas predefinidas, por ahora solo la ruta a
    una vista.
    */
    MaterialApp app = MaterialApp(
      title: "Mi primera app",
      routes: rutas,
      initialRoute: "/logincongoogle",
      debugShowCheckedModeBanner: false,
    );

    //Devuelve la estructura de la aplicación.
    return app;
  }

}