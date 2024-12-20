import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "redis-14698.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 14698,
  username: "default",
  password: "mu9TyzCZcc1RsFWafVOOpOXGzjeaoKqj",
});

const sub = new Redis({
  host: "redis-14698.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 14698,
  username: "default",
  password: "mu9TyzCZcc1RsFWafVOOpOXGzjeaoKqj",
});

class SockerService {
  private _io: Server;

  constructor() {
    console.log("Initiallising Server...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    sub.subscribe("MESSAGE");
  }

  public initListner() {
    const io = this._io;
    console.log("Init socket listner....");
    io.on("connect", (socket) => {
      console.log(`New socket connected - ${socket.id}`);

      socket.on("event:message", async ({ message }: { message: String }) => {
        console.log(`new message recived - ${message}`);
        await pub.publish("MESSAGE", JSON.stringify(message));
      });

      socket.on("disconnect", async () => {
        console.log("Connection Disconnected - " + socket.id);
      });
    });

    sub.on("message", (channel, message) => {
      console.log(channel, message);
      if (channel === "MESSAGE") {
        io.emit("event:message", { message });
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SockerService;
