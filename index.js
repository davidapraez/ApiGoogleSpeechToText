const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

routerApi(app);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
