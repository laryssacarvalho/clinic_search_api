import express from 'express';
import { jest } from '@jest/globals';
import { AppConfiguration } from '../src/config/config';
import ClinicController from '../src/controllers/clinic.controller';
import ClinicService from '../src/services/clinic.service';
import { DentalClinicsMock } from './mocks/dental-clinic.mock';
import { VetClinicsMock } from './mocks/vet-clinic.mock';

describe('ClinicController', function () {

    let controller: ClinicController;
    let service: ClinicService;        
    let responseObject: any;
    let mockResponse: Partial<express.Response>;

    beforeEach(function () {
        service = new ClinicService(new AppConfiguration());
        service.getDentalClinics = jest.fn(() => Promise.resolve(DentalClinicsMock));
        service.getVetClinics = jest.fn(() => Promise.resolve(VetClinicsMock));
            
        controller = new ClinicController(service);     
        responseObject = {};

        mockResponse = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
            })
        } as Partial<express.Response>;   
    });

    test('should return all clinics when there is no filter', function () {
        
        let mockRequest: Partial<express.Request> = { query: {} };        
                
        let expectedLength = DentalClinicsMock.length + VetClinicsMock.length;
        
        controller.getClinics(mockRequest as express.Request, mockResponse as express.Response)
            .then(result => {            
                expect(responseObject.length).toBe(expectedLength);            
            });
    });

    test('should return filtered clinics when filtered by name', function () {
        let mockRequest: Partial<express.Request> = { query: { name: '2' } };
        
        let expectedLengthDental = DentalClinicsMock.filter(x => x.name.includes('2')).length;
        let expectedLengthVet = VetClinicsMock.filter(x => x.clinicName.includes('2')).length;
        
        controller.getClinics(mockRequest as express.Request, mockResponse as express.Response)
            .then(result => {            
                expect(responseObject.length).toBe(expectedLengthDental + expectedLengthVet);
            });
    });

    test('should return filtered clinics when filtered by state name', function () {
        let mockRequest: Partial<express.Request> = { query: { state: 'New York' } };
        
        let expectedLengthDental = DentalClinicsMock.filter(x => x.stateName.includes('New York')).length;
        let expectedLengthVet = VetClinicsMock.filter(x => x.stateCode.includes('NY')).length;
        
        controller.getClinics(mockRequest as express.Request, mockResponse as express.Response)
            .then(result => {            
                expect(responseObject.length).toBe(expectedLengthDental + expectedLengthVet);
            });
    });

    test('should return filtered clinics when filtered by state abbreviation', function () {        
        let mockRequest: Partial<express.Request> = { query: { state: 'NY' } };
        
        let expectedLengthDental = DentalClinicsMock.filter(x => x.stateName.includes('New York')).length;
        let expectedLengthVet = VetClinicsMock.filter(x => x.stateCode.includes('NY')).length;
        
        controller.getClinics(mockRequest as express.Request, mockResponse as express.Response)
            .then(result => {            
                expect(responseObject.length).toBe(expectedLengthDental + expectedLengthVet);
            });
    });

    test('should return filtered clinics when filtered by opening hour', function () {        
        let mockRequest: Partial<express.Request> = { query: { from: '09:00' } };
                
        let expectedLength = DentalClinicsMock.length + VetClinicsMock.length;

        controller.getClinics(mockRequest as express.Request, mockResponse as express.Response)
            .then(result => {            
                expect(responseObject.length).toBe(expectedLength);
            });
    });

    test('should return filtered clinics when filtered by closing hour', function () {
        let mockRequest: Partial<express.Request> = { query: { to: '14:00' } };
                
        controller.getClinics(mockRequest as express.Request, mockResponse as express.Response)
            .then(result => {            
                expect(responseObject.length).toBe(1);
            });
    });   
});
