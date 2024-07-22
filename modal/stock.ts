// models/Stock.ts
import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  symbol: String,
  c: Number,
  d: Number,
  dp: Number,
  h: Number,
  l: Number,
  o: Number,
  pc: Number,
  t: Number,
  timestamp: { type: Date, default: Date.now },
});

const Stock = mongoose.models.Stock || mongoose.model('Stock', stockSchema);

export default Stock;
