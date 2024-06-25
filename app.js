if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config();
}

const express = require("express"),
    mongoose = require("mongoose"),
    ejsMate = require("ejs-mate"),
    path = require("path"),
    session = require("express-session"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoSanitize = require("express-mongo-sanitize"),
    helmet = require("helmet"),
    MongoStore = require("connect-mongo");

const User = require("./models/user");

const flightRoutes = require("./routes/flight");
const authRoutes = require("./routes/auth");

const dbUrl = process.env.dbURL || "mongodb://localhost:27017/avian";
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', function(err) {
    console.error('Connection Error:', err);
});
// if there is an error in the database connection then the console will show there is an error so we can figure out.
db.once("open", () => {
    console.log("Database Connected")
});
// The upper line helps us to know whether the database is connected or not 
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));//The upper 3 lines are for html files or ejs files which set dynamic content 
// allow the express app to look into the views folder for them.

app.use(express.static(path.join(__dirname, "public"))); //This line looks into the public folder for static files like css images etc.
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret: process.env.dbSECRET,
    touchAfter: 24*60*60
});
// This upper stre function creates a session for us in mongo db(This handles user sessions).
store.on("error", function (err) {
    console.log("Session Store Error", err);
});
// if there is an error in the storing of the session it shows it
const sessionConfig = {
    store,
    name: "sesh",
    secret: process.env.seshSECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}
// the above snippet is for the creation of a cookie it sends our data to the browser and comes back and the maximum age of this cookie is 1 week.
app.use(session(sessionConfig));

app.use(mongoSanitize());
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    if (req.originalUrl !== "/login") req.session.returnTo = req.originalUrl;
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", flightRoutes);
app.use("/", authRoutes);

app.all("*", (req, res, next) => {
    res.redirect("/");
});

app.use((err, req, res, next) => {
    console.log(err.message);
    req.flash("error", "Oh No, Something Went Wrong!");
    res.redirect("/");
});


const port = process.env.PORT || "3000";
app.listen(port, () => {
    console.log(`Server live at ${port}`);
});