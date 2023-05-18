import 'reflect-metadata';
import express from 'express';
import clinicsRouter from './src/routes/clinics-router';
import bodyParser from 'body-parser';

const main = async () => {
    const app = express();

    app.use(bodyParser.json())

    app.use('/clinics', clinicsRouter);

    app.listen(3000, () => {
      console.log('Server started');
    });
}
  
main().catch(err => {
    console.error(err);
});