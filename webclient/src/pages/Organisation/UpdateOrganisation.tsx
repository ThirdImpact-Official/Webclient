import { FC, useState } from "react";
import { Box, Input, TextareaAutosize } from "@mui/material";
import { UpdateOrganisationDto } from "@/interfaces/Organisation/updateOrganisationDto";

interface FormProps {
  data: UpdateOrganisationDto;
}

const UpdateOrganisationForm: FC<FormProps> = ({ data}) => {
  const [organisation, setOrganisation] = useState<UpdateOrganisationDto>(data);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(organisation);
  };

  const handleFieldChange = (key: keyof UpdateOrganisationDto, value: string) => {
    setOrganisation((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <Box className="pt-10 my-4">
      <form
        className="flex flex-col columns-2 gap-2 text-center border-collapse"
        onSubmit={handleSubmit}
      >
        <div className="col-span-2">
          <h3 className="text-2xl">Organisation :</h3>
          <hr />
          <div className="flex flex-col">
            <label className="form-label" htmlFor="email">Email</label>
            <Input
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
            <Input
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
            <Input
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
              className="form-control w-[350px] h-[100px]"
              value={organisation.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <button
            className="bg-blue-500 p-2 border-rounded rounded-sm text-center"
            type="submit"
          >
            Ajouter
          </button>
        </div>
      </form>
    </Box>
  );
};

export default UpdateOrganisationForm;
