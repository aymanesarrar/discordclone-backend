import app from "./server";
import router from "./routes/auth";
import profile from "./routes/profile";
const port = process.env.PORT || 3001;

app.use("/api/v1", router);
app.use("/api/v1", profile);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
