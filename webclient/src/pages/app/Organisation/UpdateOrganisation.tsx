import { FC, useState } from "react";
import { Box, Button, TextField, Alert } from "@mui/material";
import { UpdateOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/updateOrganisationDto";
import { UnitofAction } from "@/actions/UnitofAction";

interface FormProps {
  data: UpdateOrganisationDto;
  handleCallBackResponse(done: boolean): void;
}

const UpdateOrganisationForm: FC<FormProps> = ({ data, handleCallBackResponse }) => {
  const [organisation, setOrganisation] = useState<UpdateOrganisationDto>(data);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const action = new UnitofAction();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateOrganisation(organisation);
  };

  const handleFieldChange = (key: keyof UpdateOrganisationDto, value: string) => {
    setOrganisation((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const updateOrganisation = async (item: UpdateOrganisationDto) => {
    setError("");
    setSuccess("");
    try {
      console.log(item);
      const formData = new FormData();
      formData.append("orgId", item.orgId.toString());
      formData.append("name", item.name);
      formData.append("description", item.description);
      formData.append("email", item.email);
      formData.append("phoneNumber", item.phoneNumber);

      if (item.file) {
        formData.append("file", item.file);
      }

      const response = await action.organisationAction.updateOrganization(formData);

      if (response.Success) {
        console.log(response)
        setSuccess(response.Message);
        handleCallBackResponse(true);
      } else {
        setError(response.Message);
      }
    } catch (err: any) {
      setError("Une erreur s'est produite lors de la mise à jour.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "auto", marginTop: "20px" }}>
      <form
        className="flex flex-col bg-white text-center border-collapse border-spacing-2"
        onSubmit={handleSubmit}
      >
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Box className="grid p-4">
          <h3 className="text-2xl pb-4">Organisation :</h3>
          <hr />

          <Box className="flex flex-col py-2">
            <label htmlFor="email">Email</label>
            <TextField
              placeholder="insert email"
              value={organisation.email}
              id="email"
              type="email"
              onChange={(e) => handleFieldChange("email", e.target.value)}
            />
          </Box>

          <Box className="flex flex-col py-2">
            <label htmlFor="phoneNumber">Phone Number</label>
            <TextField
              placeholder="insert phone number"
              id="phoneNumber"
              value={organisation.phoneNumber}
              type="text"
              onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
            />
          </Box>

          <Box className="flex flex-col py-2">
            <label htmlFor="name">Name</label>
            <TextField
              id="name"
              placeholder="insert name"
              type="text"
              value={organisation.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
            />
          </Box>

          <Box className="flex flex-col py-2">
            <label htmlFor="description">Description</label>
            <TextField
              placeholder="insert description"
              id="description"
              fullWidth
              multiline
              rows={4}
              value={organisation.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
            />
          </Box>

          {/* File Upload */}
          <Box className="flex flex-col py-2">
            <label htmlFor="file">Logo (facultatif)</label>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setOrganisation((prev) => ({
                  ...prev,
                  file: file,
                }));
              }}
            />
          </Box>

          <Box className="pt-4">
            <Button
              className="bg-blue-500 p-2 border-rounded rounded-sm text-white"
              type="submit"
              variant="contained"
            >
              Mettre à jour
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateOrganisationForm;
