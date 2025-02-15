import GenericForm from "@/components/factory/GenericComponent/GenericForm";
import { AddOrganisationDto } from "@/interfaces/Organisation/addOrganisationDto";
import { useState } from "react";


const AddNewOrganisation = () => {

   
    const  [organisation, setOrganisation] = useState<AddOrganisationDto | undefined>(null);
    const handlesubmit=()=>{
        console.log(organisation);
    };
    const handleChange=(key: keyof AddOrganisationDto, value: string)=>{
        setOrganisation((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
    return (<div >
                <GenericForm data={organisation} 
                             onSubmit={handlesubmit}
                            onChange={handleChange}   />
            </div>);
};

export default AddNewOrganisation;