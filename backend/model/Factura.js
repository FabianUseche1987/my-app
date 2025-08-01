import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number,
  precioUnitario: Number,
});

const facturaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nombre: String,
  identificacion: String,
  correo: String,
  numeroFactura: String,
  valor: Number,
  tipoPago: String,
  items: [ItemSchema], // ✅ aquí se usa correctamente
  observaciones: String,
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model("Factura", facturaSchema);
