const express = require("express");
const bodyParser = require("body-parser");

const DOMAIN = "sandbox7a25e35c2feb42b19b8a73410c13ebdc.mailgun.org";
const API_KEY = "5d77d82e2b805ea85ab1e48088a688fe";

const PASSWORD = "118d479122bf159476a3f1044003db76-b7b36bc2-a631485a";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: "postmaster@sandbox7a25e35c2feb42b19b8a73410c13ebdc.mailgun.org",
    pass: PASSWORD,
  },
});

const app = express();
const path = require("path");
const { error } = require("console");

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post("/contact", (req, res) => {
  const messageData = {
    from: "brad@sandbox7a25e35c2feb42b19b8a73410c13ebdc.mailgun.org",
    to: "pg9779628@gmail.com",
    subject: "Barbosa Dev" + req.body.name,
    text: "Email: " + req.body.email + " - " + req.body.msg,
  };

  transporter.sendMail(messageData, (error, info) => {
    if (error) {
      res.redirect("/contact");
      console.log(error);
    } else {
      res.redirect("/contact");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000!");
});
