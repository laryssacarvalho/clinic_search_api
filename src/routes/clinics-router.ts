import express from 'express';
import ClinicController from '../controllers/clinic.controller';
import Container from 'typedi';

const clinicsRouter = express.Router();

const clinicController = Container.get(ClinicController);

clinicsRouter.get('/', (req, res) => { clinicController.getClinics(req,res)})

export default clinicsRouter;