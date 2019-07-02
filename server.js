// Dependencies
// =============================================================
const express = require('express');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing (Middleware)
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up the Models
// =============================================================
const db = require('./models');

// Sets up Static Folder
// =============================================================
app.use(express.static('public'));

// Requires the API-Routes
// =============================================================
require('./routes/apiRoutes')(app);

// Requires the View-Routes
// =============================================================
require('./routes/viewRoutes')(app);

// Sets up Handlebars
// =============================================================
const exphbs = require('express-handlebars');

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});