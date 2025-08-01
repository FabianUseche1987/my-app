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
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar MongoDB:', err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando 🚀' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//usuarios

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo guardar el usuario', details: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener usuarios' });
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

