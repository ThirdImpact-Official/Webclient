import { GetAdressDto } from '../Adress/getAdressDto';
export interface GetOrganisationDto  {
    orgId: number;
    name: string;
    email: string;
    description: string;
    phoneNumber: string;
    address: GetAdressDto | null;
}