import express from 'express';
import DentalClinic from '../models/dental-clinic.model';
import ClinicService from '../services/clinic.service';
import { Service } from 'typedi';
import usStates from '../states';

@Service()
export default class ClinicController {

    constructor(private clinicService: ClinicService){}

    async getClinics(req: express.Request, res: express.Response) {
                
        let clinics = await this.getAllClinics();
        
        clinics = this.filterByName(req, clinics);
        
        clinics = this.filterByState(req, clinics);        
        
        clinics = this.filterByFromAvailability(req, clinics);
    
        clinics = this.filterByToAvailability(req, clinics);
                
        return res.json(clinics);
    }

    private async getAllClinics(): Promise<DentalClinic[]> {
        let dentalClinics = await this.clinicService.getDentalClinics();
        
        let vetClinics = await this.clinicService.getVetClinics();
        
        
        let vetClinicsMapped = vetClinics.map(x => { 
            return <DentalClinic>{ 
                name: x.clinicName, 
                stateName: usStates.find(s => s.abbreviation == x.stateCode.toUpperCase())?.name,
                availability: { 
                    from: x.opening.from, 
                    to: x.opening.to
                }
            }});
    
        return dentalClinics.concat(vetClinicsMapped);
    }

    private filterByName(req: express.Request, clinics: DentalClinic[]): DentalClinic[] {
        let name = req.query?.name as string;

        if(name)
            return clinics.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

        return clinics;
    }

    private filterByState(req: express.Request, clinics: DentalClinic[]): DentalClinic[] {
        let state = req.query?.state as string;

        if(!state)
            return clinics;
            
        let isAbbreviation = state.length == 2;
        let comparisonValue: string | undefined = state;

        if(isAbbreviation)
            comparisonValue = usStates.find(x => x.abbreviation == state.toUpperCase())?.name;
        
        if(comparisonValue)
            return clinics.filter(c => c.stateName.toLowerCase() == comparisonValue!.toLowerCase());
        
        return clinics;
    }

    private filterByFromAvailability(req: express.Request, clinics: DentalClinic[]): DentalClinic[]{    
        let fromAvailability = req.query?.from as string;

        if(fromAvailability){
            let fromDate = this.getDateObjectFromString(fromAvailability);
            return clinics.filter(c => this.getDateObjectFromString(c.availability.from) >= fromDate);            
        }        
        return clinics;        
    }

    private filterByToAvailability(req: express.Request, clinics: DentalClinic[]): DentalClinic[]{   
        let toAvailability = req.query?.to as string;

        if(toAvailability){
            let toDate = this.getDateObjectFromString(toAvailability);
            return clinics.filter(c => this.getDateObjectFromString(c.availability.to) <= toDate);        
        }

        return clinics;
    }

    private getDateObjectFromString(hour: string): Date {
        const [hours, minutes] = hour.split(':');
        const date = new Date();
        date.setHours(Number(hours), Number(minutes), 0);
        return date;
    }    
}