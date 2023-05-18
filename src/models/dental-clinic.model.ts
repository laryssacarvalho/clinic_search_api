type DentalClinic = {
    name: string
    stateName: string,
    availability: DentalClinicAvailability
}
type DentalClinicAvailability = {
    from: string
    to: string
}
export default DentalClinic