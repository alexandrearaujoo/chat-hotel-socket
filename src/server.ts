import { server } from "./http";
import { config } from "dotenv";
import './socket'

config()

server.listen(process.env.PORT || 3333, () => {
  console.log("Server running");
});
