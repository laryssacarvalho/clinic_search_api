import axios, { AxiosResponse } from "axios";
import { Service } from "typedi";
import VetClinic from "../models/vet-clinic.model";
import DentalClinic from "../models/dental-clinic.model";
import { AppConfiguration } from "../config/config";

@Service()
export default class ClinicService {    
    constructor(private appConfig: AppConfiguration) {}

    public async getVetClinics() {
        return await this.getClinicsFromEndpoint<VetClinic>(this.appConfig.vetClinicsPath);    
    };

    public async getDentalClinics() {
        return await this.getClinicsFromEndpoint<DentalClinic>(this.appConfig.dentalClinicsPath);    
    };

    private async getClinicsFromEndpoint<ApiResponseType>(path: string) {        
        let result: AxiosResponse = await axios.get(`${this.appConfig.clinicsBaseApiUrl}${path}`);
        let clinics: ApiResponseType[] = result.data;
        return clinics;    
    };
}