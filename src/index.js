const express = require('express');

const expressConfigurator = require('./config/expressConfig');
const handlebarsConfigurator = require('./config/handlebarsConfig');
const dbConnect = require('./config/dbConfig');

const routes = require('./routes');

const app = express();

const PORT = 3030;

expressConfigurator(app);
handlebarsConfigurator(app);

dbConnect()
    .then(() => { console.log('Db connected!') })
    .catch(err => console.log(err));

app.use(routes);


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));