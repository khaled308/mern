require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const connectToDB = require("./utils/db");
const { authRoutes } = require("./routes");

class Server {
  constructor() {
    this.app = express();
  }

  start() {
    connectToDB();
    this.devMiddleware();
    this.middleware();
    this.apiRoutes();
    this.app.use(this.errorHandler);
    this.runServer();
  }

  devMiddleware() {
    if (process.env.NODE_ENV == "DEV") {
      this.app.use(morgan("dev"));
    }
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  apiRoutes() {
    this.app.use("/api/auth/", authRoutes);
  }

  errorHandler(err, req, res, next) {
    const { status = 500, message = "something goes wrong" } = err;

    res.status(status).send({ errors: [message] });
  }

  runServer() {
    const httpServer = http.createServer(this.app);
    this.startHttpServer(httpServer);
  }

  startHttpServer(httpServer) {
    httpServer.listen(process.env.PORT || 8000, () => {
      console.log(
        "server connect successfully",
        `http://localhost:${process.env.PORT}`
      );
    });
  }
}

const server = new Server();
server.start();
