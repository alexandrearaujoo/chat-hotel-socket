import { server } from "./http";
import './socket'

server.listen(3333, () => {
  console.log("Server running");
});
