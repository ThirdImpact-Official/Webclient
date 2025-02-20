import { GetOrganisationDto } from '@/interfaces/Organisation/getOrganisationDto';
import { FC } from 'react';


interface OrganisationDetailsProps{
    data: GetOrganisationDto;
}
const OrganisationDetails:FC<OrganisationDetailsProps> = ({data}) => {
    return(
            <div className="w-full h-full flex items-center justify-center">
                <div className='my-4 space-y-2'>
                    <div>
                        <p><strong >Id</strong>{data.orgId}</p>
                    </div>
                    <div>
                        <p><strong>Name</strong> {data.name} </p>
                    </div>
                    <div>
                        <p><strong>Email</strong>{data.email} </p>
                    </div>
                    <div>
                        <p><strong>description</strong>{data.description} </p>
                    </div>
                    <div>
                        <p><strong>Phone Number</strong> {data.phoneNumber} </p>
                    </div>
                </div>
           </div>)
}
export default OrganisationDetails;