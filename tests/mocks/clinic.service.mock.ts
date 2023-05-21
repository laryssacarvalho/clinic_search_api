import ClinicService from "../../src/services/clinic.service";
import { DentalClinicsMock } from "./dental-clinic.mock";

export const ClinicServiceMock = jest.spyOn(ClinicService.prototype, 'getDentalClinics')
    .mockImplementation(() => Promise.resolve(DentalClinicsMock));
