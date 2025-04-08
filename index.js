const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://hbhavsar847:RJQwkddFHN3L9Zgx@cluster0.insuel7.mongodb.net/");

const ItemSchema = new mongoose.Schema({
  consumerName: String,
  numPanels: Number,
  panelWattage: String,
  panelMake: String,
  panelBarcodes: [String],
  inverterSerial: String,
  inverterMake: String,
  timestamp: String,
});

const Item = mongoose.model("Item", ItemSchema);

app.post("/add-item", async (req, res) => {
  console.log("hello")  
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json({ message: "Item saved successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/items", async (req, res) => {
  const items = await Item.find().sort();
  res.json(items);
});

app.delete("/items/:id", async (req, res) => {

    try {
      const { id } = req.params;
      console.log(id)
      const result = await Item.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting item", error: err.message });
    }
  });
  
app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
  });
  
