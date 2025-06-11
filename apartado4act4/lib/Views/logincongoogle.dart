import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class Logincongoogle extends StatefulWidget {
  const Logincongoogle({super.key});

  @override
  State<Logincongoogle> createState() => _LogincongoogleState();
}

class _LogincongoogleState extends State<Logincongoogle> {
  Future<User?> loginConGoogle() async {
    try {
      final GoogleSignIn googleSignIn = GoogleSignIn(
        clientId: '19903019689-k72beo1aas2roh2pn2rovo9kh9ok1ocs.apps.googleusercontent.com', // <-- tu Client ID aquí
      );

      final GoogleSignInAccount? googleUser = await googleSignIn.signIn();
      if (googleUser == null) {
        print("Login cancelado");
        return null;
      }

      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final userCredential =
          await FirebaseAuth.instance.signInWithCredential(credential);

      return userCredential.user;
    } catch (e) {
      print("Error en login con Google: $e");
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Login con Google Web")),
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            final user = await loginConGoogle();
            if (user != null) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text("Bienvenido: ${user.email}")),
              );
            } else {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Login cancelado o fallido")),
              );
            }
          },
          child: const Text("Iniciar sesión con Google"),
          
        ),
      ),
    );
  }
}

