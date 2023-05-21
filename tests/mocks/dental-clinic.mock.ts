import DentalClinic from "../../src/models/dental-clinic.model";

export const DentalClinicsMock: DentalClinic[] = [
    {
        name: 'dental clinic 1',
        stateName: 'California',
        availability: {
            from: '09:00',
            to: '17:00'
        }
    },
    {
        name: 'dental clinic 2',
        stateName: 'New York',
        availability: {
            from: '11:00',
            to: '17:00'
        }
    }
]