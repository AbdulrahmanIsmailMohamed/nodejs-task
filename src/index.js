const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`link: http://localhost:${PORT}/api`);
  console.log(`The Server Runnig On Port : ${PORT}`);
});
