import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(cors());

app.use(express.json()); //to read body json data

const port = process.env.PORT || 6666; //Port
const db_Url = process.env.DB_URL; //DataBase Link

//All Routes
app.use("/", routes);

//DataBase Connection
mongoose
  .connect(`${db_Url}`)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server is up and running on ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error in running & connecting to DB : ${error}`);
  });
