// import logger from "./utils/logger";
import * as dotenv from "dotenv";
import createServer from "./utils/server";
import connect from "./utils/connect";
import swaggerDocs from "./utils/swagger";

dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 1357;
const app = createServer();

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);

  await connect();

  swaggerDocs(app, port);
});
