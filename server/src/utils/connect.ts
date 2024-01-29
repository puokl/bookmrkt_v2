import mongoose from "mongoose";
// import logger from "./logger";

async function connect() {
  const dbUri = process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(dbUri);
    console.info(`DB Connected to ${conn.connection.host}`);
  } catch (error) {
    console.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;
