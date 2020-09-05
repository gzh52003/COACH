const whiteList = ["http://localhost:8080", "http://localhost:8081"];

function cors(req, res, next) {
  const origin = req.get("Origin");
  if (whiteList.includes(origin)) {
    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers":
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
      "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Credentials": true,
    });
    if (req.method == "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  }
}

module.exports = cors;
