import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  // serverSelectionTimeoutMS: 30000, // 30 seconds
  // socketTimeoutMS: 45000, // 45 seconds
});
const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB!");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
