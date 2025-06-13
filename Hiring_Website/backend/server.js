const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const sql = require("./config/db.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

async function initDB() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log(" Connected to DB at:", result[0]);
  } catch (error) {
    console.log("Error initDB", error);
  }
}

const userRoute = require("./routes/userRoute.js");
const professionRoute = require("./routes/professionRoute.js");
const employerRoute = require("./routes/employerRoute.js");
const postRoute = require("./routes/postRoute.js");
const applicationRoute = require("./routes/applicationRoute.js");
const candidateRoute = require("./routes/candidateRoute.js");
const locationRoute = require("./routes/locationRoute.js");
const jobTypeRoute = require("./routes/jobTypeRoute.js");
const uploadRoute = require("./routes/upload.routes.js");
const loginRoute = require("./routes/loginRoute.js")
const mailTimeRoute = require("./routes/mailTimeRoute.js")
const branchRoute = require("./routes/branchRoute.js")
const categoryRoute = require("./routes/categoryRoute.js")
const forgotPassRoute = require("./routes/forgotPassRoute.js")
const confirmPassRoute = require("./routes/confirmPassRoute.js")
const jobTestRoute = require("./routes/jobTestRoute.js")
const testQuestionRoute = require("./routes/testQuestionRoute.js")

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/", userRoute);
app.use("/", professionRoute);
app.use("/", employerRoute);
app.use("/", postRoute);
app.use("/", applicationRoute);
app.use("/", candidateRoute);
app.use("/", locationRoute);
app.use("/", jobTypeRoute);
app.use("/upload", uploadRoute);
app.use("/", loginRoute);
app.use("/", mailTimeRoute)
app.use("/", branchRoute)
app.use("/", categoryRoute)
app.use("/", forgotPassRoute)
app.use("/", confirmPassRoute)
app.use("/", jobTestRoute)
app.use("/", testQuestionRoute)

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
