import { Service } from "typedi";

@Service()
export class AppConfiguration {
    dentalClinicsPath: string = '/dental-clinics.json';
    vetClinicsPath: string = '/vet-clinics.json';
    clinicsBaseApiUrl: string = 'https://storage.googleapis.com/scratchpay-code-challenge';
};