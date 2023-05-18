type VetClinic = {
    clinicName: string
    stateCode: string,
    opening: VetClinicOpening
}
type VetClinicOpening = {
    from: string
    to: string
}
export default VetClinic