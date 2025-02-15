import GenericForm from "@/components/factory/GenericComponent/GenericForm";
import { UpdateOrganisationDto } from "@/interfaces/Organisation/updateOrganisationDto";
import { FC, useState } from "react";

const UpdateOrganisation:FC<UpdateOrganisationDto> = (updateOrganisation:UpdateOrganisationDto) => {

   
    const  [organisation, setOrganisation] = useState<UpdateOrganisationDto| undefined>(updateOrganisation);
    const handlesubmit=()=>{};
    const handleChange=(key: keyof UpdateOrganisationDto, value: string)=>{
        setOrganisation((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
    return (<div className="">
        AddOrganisation
                <GenericForm data={organisation} 
                             onSubmit={handlesubmit}
                            onChange={handleChange}   />
            </div>);
};

export default UpdateOrganisation;