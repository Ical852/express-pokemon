import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./configs/database";
import pokemonRoutes from "./routes/pokemonRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/pokemon", pokemonRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});