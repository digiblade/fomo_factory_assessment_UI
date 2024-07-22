// pages/api/data.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Stock from "@/modal/stock";
// Assuming you have a Mongoose model for stocks

const mongoURI = process.env.MONGO_URI as string;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { symbol } = req.query;
    debugger
  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  if (!mongoose.connection.readyState) {
    await mongoose.connect(mongoURI, {});
  }

  const data = await Stock.find({ symbol })
    .sort({ timestamp: -1 })
    .limit(20)
    .exec();

  res.status(200).json(data);
};

export default handler;
