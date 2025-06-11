import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class Homeviewlisten extends StatefulWidget{
  const Homeviewlisten({super.key});

  @override
  State<Homeviewlisten> createState() => _HomeviewlistenState();
}

class _HomeviewlistenState extends State<Homeviewlisten> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Compras en tiempo real'),
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance
            .collection('compras')
            .orderBy('fecha', descending: true)
            .snapshots(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }

          final compras = snapshot.data!.docs;

          if (compras.isEmpty) {
            return Center(child: Text('No hay compras registradas.'));
          }

          return ListView.builder(
            itemCount: compras.length,
            itemBuilder: (context, index) {
              final compra = compras[index].data() as Map<String, dynamic>;
              return ListTile(
                title: Text(compra['producto'] ?? 'Sin producto'),
                subtitle: Text('Precio: ${compra['precio'] ?? '0'} €'),
                trailing: Text(compra['estado_pago'] ?? 'Desconocido'),
              );
            },
          );
        },
      ),
    );
  }
}