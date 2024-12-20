import http from "http";
import SockerService from "./services/socket";

async function init() {
  const httpServer = http.createServer();
  const PORT = process.env.PORT ? process.env.PORT : 8000;

  const sockerServer = new SockerService();

  sockerServer.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });

  sockerServer.initListner();
}

init();
