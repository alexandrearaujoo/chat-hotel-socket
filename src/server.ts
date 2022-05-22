import { server } from "./http";
import { config } from "dotenv";
import './socket'

config()

server.listen(3333, () => {
  console.log("Server running");
});
