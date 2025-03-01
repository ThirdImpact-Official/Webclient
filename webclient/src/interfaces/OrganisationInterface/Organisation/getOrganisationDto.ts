import FormUtils from '@/classes/FormUtils';
import { GetAdressDto } from '../Adress/getAdressDto';
export interface GetOrganisationDto  {
    orgId: number;
    name: string;
    email: string;
    description: string;
    phoneNumber: string;
    address: GetAdressDto | null;
}

export const OrganisationColumns = [
    FormUtils.TableMapper("ID", "orgId"),
    FormUtils.TableMapper("name", "name"),
    FormUtils.TableMapper("email", "email"),
    FormUtils.TableMapper("phone number", "phoneNumber"),
    FormUtils.TableMapper("description", "description"),
];