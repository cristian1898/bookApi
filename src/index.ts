import "es6-shim";
import "reflect-metadata";
import env from "@config";
import { app } from "@app";

//redirect to home
app.use((req, res, next) => {
  res.redirect("/");
});

app.listen(+env.PORT, () =>
  console.log(`🔥 Server running on port ${env.PORT}`),
);
