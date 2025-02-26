import { FC, useState } from "react";
import { Box, Button,  TextareaAutosize, TextField } from "@mui/material";
import { UpdateOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/updateOrganisationDto";

interface FormProps {
  data: UpdateOrganisationDto;
  handleCallBackResponse(done: boolean):void;
}

const UpdateOrganisationForm: FC<FormProps> = ({ data, handleCallBackResponse}) => {
  const [organisation, setOrganisation] = useState<UpdateOrganisationDto>(data);
  
  /*
    function to handle the data from the child component 
    for details
  */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(organisation);
    handleCallback();
  };
  /*
    function to handle the data from the child component 
    for details
  */
  const handleFieldChange = (key: keyof UpdateOrganisationDto, value: string) => {
    setOrganisation((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
 const handleCallback = () =>
 {
   console.log(organisation);
   return handleCallBackResponse(true);
 }
  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "auto", marginTop: "20px" }}>
      <form
        className="flex flex-col  text-center border-collapse border-spacing-2"
        onSubmit={handleSubmit}>
        <div className="grid ">
          <div className="">
            <h3 className="text-2xl">Organisation :</h3>
            <hr />
            <div className="flex flex-col">
              <label className="form-label" htmlFor="email">Email</label>
              <TextField
                  placeholder="insert email"
                  className="form-control"
                  value={organisation.email}
                  id="email"
                  type="text"
                  onChange={(e) => handleFieldChange("email", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNumber">PhoneNumber</label>
              <TextField
                  placeholder="insert phone number"
                  className="form-control"
                  id="phoneNumber"
                  value={organisation.phoneNumber}
                  type="text"
                  onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <TextField
                  id="name"
                  placeholder="insert name"
                  type="text"
                  value={organisation.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <TextareaAutosize
                  placeholder="insert description"
                  id="description"
                  style={{ width: "350px", height: "100px" , borderRadius: "5px" ,border: "1px solid #ccc"}}
                  className="form-control"
                  value={organisation.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <Button
              onClick={(e) => handleSubmit(e)}
              className="bg-blue-500 p-2 border-rounded rounded-sm text-center"
              type="submit">
            Ajouter
          </Button>
        </div>
      </form>
    </Box>);
};

export default UpdateOrganisationForm;
