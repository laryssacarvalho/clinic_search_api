import express from 'express';
import DentalClinic from '../models/dental-clinic.model';
import { ClinicService } from '../services/clinic.service';
import { Service } from 'typedi';

@Service()
export class ClinicController {

    constructor(private clinicService: ClinicService){}

    async getClinics(req: express.Request, res: express.Response) {
        let name = req.query?.name as string;
        let stateName = req.query?.stateName as string;
        let fromAvailability = req.query?.from as string;
        let toAvailability = req.query?.to as string;
        
        let clinics = await this.getAllClinics();
        
        if(fromAvailability){
            let fromDate = this.getDateObjectFromString(fromAvailability);
            clinics = clinics.filter(c => this.getDateObjectFromString(c.availability.from) >= fromDate);
        }
    
        if(toAvailability){
            let toDate = this.getDateObjectFromString(toAvailability);
            clinics = clinics.filter(c => this.getDateObjectFromString(c.availability.to) <= toDate);
        }
    
        if(name){
            clinics = clinics.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
        }
    
        if(stateName){
            clinics = clinics.filter(c => c.stateName.toLowerCase().includes(stateName.toLowerCase()));
        }

        return res.status(200).json(clinics);
    }

    private async getAllClinics() {
        let dentalClinics = await this.clinicService.getDentalClinics();
    
        let vetClinics = await this.clinicService.getVetClinics();
        
        let vetClinicsMapped = vetClinics.map(x => { 
            return <DentalClinic>{ 
                name: x.clinicName, 
                stateName: x.stateCode, 
                availability: { 
                    from: x.opening.from, 
                    to: x.opening.to
                }
            }});
    
        return dentalClinics.concat(vetClinicsMapped);
    }
    
    getDateObjectFromString(hour: string): Date {
        const [hours, minutes] = hour.split(':');
        const date = new Date();
        date.setHours(Number(hours), Number(minutes), 0);
        return date;
    }    
}