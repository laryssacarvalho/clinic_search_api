import { jest } from '@jest/globals';
import { AppConfiguration } from '../src/config/config';
import ClinicService from '../src/services/clinic.service';
import { DentalClinicsMock } from './mocks/dental-clinic.mock';
import { VetClinicsMock } from './mocks/vet-clinic.mock';
import axios from 'axios';

jest.mock('axios');

describe('ClinicService', function () {
    let service: ClinicService;        

    beforeEach(function () {
        service = new ClinicService(new AppConfiguration());        
    });

    test('getVetClinics should call vet endpoint and return list', function () {           
        jest.spyOn(axios, 'get').mockReturnValueOnce(Promise.resolve({ data: VetClinicsMock }));

        service.getVetClinics().then(result => {
            expect(result.length).toBe(VetClinicsMock.length);
            expect(result).toEqual(VetClinicsMock);        
        });        
    });

    test('getDentalClinics should call dental endpoint and return list', function () {
        jest.spyOn(axios, 'get').mockReturnValueOnce(Promise.resolve({ data: DentalClinicsMock }));

        service.getDentalClinics().then(result => {
            expect(result.length).toBe(DentalClinicsMock.length);
            expect(result).toEqual(DentalClinicsMock);        
        });
    });    
});
