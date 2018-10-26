import express from 'express';

import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const port = process.env.PORT || (process.argv[2] || 3000);

if (!module.parent) { app.listen(port); }

console.log('The app is running successfully on port:' + port);

export default(app);
