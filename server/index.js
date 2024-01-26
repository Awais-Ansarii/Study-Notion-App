const express = require("express");
const app = express();

const dotenv = require("dotenv");
const dbConnection = require("./config/database");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", //is origin se jo bhi req arhi h aap ko us ko entertain krna hai
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);


//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//default route
app.get("/", (req, res) => {
  res.send("<h1>Study Notion App</h1>");
});

//server connection
app.listen(PORT, () => {
  console.log(`Server is running on port-${PORT}`);
});

// DB connection
dbConnection();
