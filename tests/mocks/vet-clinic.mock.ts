import VetClinic from "../../src/models/vet-clinic.model";

export const VetClinicsMock: VetClinic[] = [
    {
        clinicName: 'vet clinic 1',
        stateCode: 'CA',
        opening: {
            from: '09:00',
            to: '17:00'
        }
    },
    {
        clinicName: 'vet clinic 2',
        stateCode: 'NY',
        opening: {
            from: '10:00',
            to: '14:00'
        }
    }
]