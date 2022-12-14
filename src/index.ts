import app from "./server";
import router from "./routes/auth";
const port = process.env.PORT || 3001;

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
