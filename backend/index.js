import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './model/User.js';
import Factura from "./model/Factura.js";


dotenv.config();
//docker start mongo-db

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/?authSource=admin';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  console.log('🌍 Entorno:', process.env.NODE_ENV);
  console.log('🔗 URI prefix:', MONGO_URI.substring(0, 30) + '...');
})
.catch(err => {
  console.error('❌ Error al conectar MongoDB:', err);
  console.error('📝 URI usado:', MONGO_URI.substring(0, 30) + '...');
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando 🚀' });
});

// Endpoint de debug para verificar configuración
app.get('/debug', (req, res) => {
  res.json({
    message: 'Debug info v2',
    nodeEnv: process.env.NODE_ENV,
    mongoUri: process.env.MONGODB_URI ? 'Configurado ✅' : 'No configurado ❌',
    mongoUriPrefix: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'N/A',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//usuarios

app.post('/users', async (req, res) => {
  try {
    console.log('Intentando crear usuario:', req.body);
    const newUser = new User(req.body);
    const saved = await newUser.save();
    console.log('Usuario guardado exitosamente:', saved._id);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    res.status(500).json({ error: 'No se pudo guardar el usuario', details: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    console.log('Intentando obtener usuarios...');
    const users = await User.find();
    console.log('Usuarios obtenidos:', users.length);
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'No se pudo obtener usuarios', details: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el usuario' });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// Obtener un usuario específico por ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

//Factura


app.post("/facturas", async (req, res) => {
  try {
    const { userId, items, ...restoDatos } = req.body;

    // Aseguramos que el userId sea tratado como ObjectId
    const factura = new Factura({
      ...restoDatos,
      userId: new mongoose.Types.ObjectId(userId),
      items: items.map((item) => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
      })),
    });

    const facturaGuardada = await factura.save();
    res.status(201).json(facturaGuardada);
  } catch (error) {
    console.error("❌ Error al guardar la factura:", error);
    res.status(500).json({ error: "Error al guardar la factura", details: error });
  }
});

// Actualizar una factura existente
app.put("/facturas/:facturaId", async (req, res) => {
  try {
    const { facturaId } = req.params;
    const { userId, items, ...restoDatos } = req.body;

    const facturaActualizada = await Factura.findByIdAndUpdate(
      facturaId,
      {
        ...restoDatos,
        userId: new mongoose.Types.ObjectId(userId),
        items: items.map((item) => ({
          nombre: item.nombre,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
        })),
      },
      { new: true }
    );

    if (!facturaActualizada) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    res.json(facturaActualizada);
  } catch (error) {
    console.error("❌ Error al actualizar la factura:", error);
    res.status(500).json({ error: "Error al actualizar la factura", details: error });
  }
});



app.get("/facturas/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const facturas = await Factura.find({ userId });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener facturas" });
  }
});

// Obtener una factura específica por ID
app.get("/facturas/single/:facturaId", async (req, res) => {
  try {
    const { facturaId } = req.params;
    const factura = await Factura.findById(facturaId);
    if (!factura) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener factura" });
  }
});

