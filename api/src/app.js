import express from 'express';

import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('The app is running successfully');
});

export default(app);
