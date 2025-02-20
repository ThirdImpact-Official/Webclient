import { AddAdressDto } from "@/interfaces/Adress/addAdressDto";
import { AddOrganisationDto } from "@/interfaces/Organisation/addOrganisationDto";
import { Input } from "@mui/material";
import React, { useState } from "react";


const AddNewOrganisation = () => {

   
    const [organisation, setOrganisation] = useState<AddOrganisationDto | undefined>(
        {
            name: "",
            email: "",
            phoneNumber: "",
            description: "",
            address: null,
            formFile: null
        });
    const [formFile, setFormFile] = useState<File | null>(null);
    const [address, setAddress] = useState<AddAdressDto | null>(
        {
            street: "",
            postalCode: "",
            city: "",
            country: "",
            latitude: 0,
            longitude: 0
        });

    const handlesubmit=(event: React.FormEvent)=>{
        event.preventDefault(); //avoid page refresh
        //insert data Value from Address and from FormFile
        organisation!.address = address;
        organisation!.formFile = formFile;
        
        // Console.log
        console.log("submit");
        console.log(organisation);
    };
    const handleOrganisationChange=(key: keyof AddOrganisationDto, value: string)=>{
        setOrganisation((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleAdressChange=(key: keyof AddAdressDto, value: unknown)=>{
        setAddress((prevData) => ({
            ...prevData,
            [key]: value,
        }))
    }
    const handleFileFormChange=(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        if( event.target instanceof HTMLInputElement) 
            setFormFile(event.target.files ? event.target.files[0] : null);
    }

    return (<div className="pt-10 my-4 ">
                <form className="flex flex-col  col-2 gap-2 text-center border-collapse" 
                      onSubmit={handlesubmit}>
                  <div className="col-span-2">
                    <h3 className="text-2xl">Organisation :</h3>
                    <hr />
                        <div className="flex flex-col">
                            <div>
                                <label className="form-label" 
                                       htmlFor="email" >Email</label>
                            </div>
                            <div>
                                <input 
                                    placeholder="insert email" className="form-control" 
                                    id="email" 
                                    type="text" 
                                    onChange={(e) => handleOrganisationChange("email", e.target.value)} />
                            </div>
                        </div>
                    
                        <div className="flex flex-col">
                            <div>
                                <label htmlFor="PhoneNumber">PhoneNumber</label>
                            </div>
                            <div>
                                <input 
                                    placeholder="insert phone number"
                                    className="form-control"
                                    id="PhoneNumber" 
                                    type="text" 
                                    onChange={(e) => handleOrganisationChange("phoneNumber", e.target.value)} />
                            </div>
                        </div>
                
                        <div className="flex flex-col">
                            <div>
                                <label 
                                    className="form-label" 
                                    htmlFor="description">Description</label>
                            </div>
                            <div>
                                <textarea
                                          placeholder="insert description" 
                                          id="description" 
                                          className="form-control w-[350px] h-[100px]"
                                        
                                          onChange={(e) => handleOrganisationChange("description", e.target.value)} />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div>
                                <label htmlFor="name" >Name</label>
                            </div>
                            <div>
                                <input id="name" 
                                        placeholder="insert name"
                                        type="text" 
                                        onChange={(e) => handleOrganisationChange("name", e.target.value)} />
                            </div>
                        </div>
                  </div>
                    <div className="col-span-2 pt-4">
                        <h3 className="text-2xl">Address</h3>
                        <hr />
                        <div className="flex flex-col">
                            <div>
                                <label 
                                    className="form-label"
                                    htmlFor="name" >postal Code</label>
                            </div>
                            <div>
                                <input 
                                    placeholder="insert postal code" 
                                    id="name" 
                                    type="text" 
                                    onChange={(e) => handleAdressChange("postalCode", e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <label htmlFor="name" >City</label>
                            </div>
                            <div>
                                <input
                                    placeholder="insert city" 
                                    id="name" 
                                    type="text" 
                                    onChange={(e) => handleAdressChange("city", e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <label htmlFor="name" >Country</label>
                            </div>
                            <div>
                                <input 
                                placeholder="insert country" 
                                id="name"
                                type="text" 
                                onChange={(e) =>handleAdressChange("country", e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <label 
                                    htmlFor="name" >Latitude</label>
                            </div>
                            <div>
                                <input 
                                    placeholder="insert latitude"  
                                    id="name" 
                                    type="text" 
                                    onChange={(e) => handleAdressChange("latitude", e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <label htmlFor="name" >Longitude</label>
                            </div>
                            <div>
                                <input id="name" 
                                       type="text" 
                                       placeholder="insert longitude"
                                       onChange={(e) => handleAdressChange("street", e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 pt-4">
                        <h3 className="text-2xl">Logo d'organisation</h3>
                        <hr />
                        <Input type="file" 
                               className="pt-2" 
                               placeholder="insert logo"
                               onChange={(e)=>handleFileFormChange(e)} />
                    </div>
                    <div className="">
                        <button 
                            className="bg-blue-500 p-2 border-rounded rounded-sm text-center" 
                            type="submit" 
                            onClick={handlesubmit}>Ajouter</button>
                    </div>
                </form>
            </div>);
};

export default AddNewOrganisation;
