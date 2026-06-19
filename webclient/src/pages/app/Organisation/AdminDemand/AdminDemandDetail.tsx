import { GetAdminDemandDto,ColumnsAdm } from "@/interfaces/AdminDemand/GetAdminDemand";
import { FC, useState } from "react";
import { data } from 'react-router-dom';
import DetailsComponent from '@/components/factory/GenericComponent/DetailsComponent';
import { Button, Divider, Box, Typography, Modal,Alert,Snackbar, Card ,CardHeader,CardContent, CardActions } from '@mui/material';
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import { AdminDemandAction } from "@/actions/AdminDemandAction";
import CreateAdminResponse from "./CreateAdminResponse";
import AddResponseAdmin from "./CreateResponseAdmin";
import { ResponseAdminDemandDto } from "@/interfaces/AdminDemand/ResponseAdminDemand";
import { ErrorType } from '../../../../enums/RequestType';

interface AdminDetailsProps {
    data: GetAdminDemandDto
}
const AdminDetails: FC<AdminDetailsProps> = ({ data }) => {
  const [adminDetail, setAdminDetails] = useState<GetAdminDemandDto | null>(data);
  const [responseAdmn, setResponseAdmn] = useState<ResponseAdminDemandDto>({
    id: data.id,
    motifRefus: "",
    commentairesAdmin: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const actions = new AdminDemandAction();
  const columns = ColumnsAdm;

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const showMessage = (msg: string) => {
    setSnackbarMessage(msg);
    setSnackbarOpen(true);
  };

  const handleRefused = async (item: ResponseAdminDemandDto) => {
    const response = await actions.RefuseDemand(item);
    showMessage(response.Message);
  };

  const handleValidation = async (item: ResponseAdminDemandDto) => {
    const response = await actions.ValidDemand(item);
    showMessage(response.Message);
  };

  const handleDelete = async () => {
    const response = await actions.DeleteDemand(data.id);
    showMessage(response.Message);
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          border: "1px solid #d0d7de",
          borderRadius: "6px",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Header GitHub-style */}
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#24292f" }}>
              Détails de la demande
            </Typography>
          }
          action={
            <ModalComponent
              ButtonTitle="Supprimer"
              ButtonColor="error"
              Title="Supprimer la demande"
              Description="Voulez-vous vraiment supprimer cette demande ?"
            >
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Button variant="contained" color="error" onClick={handleDelete}>
                  Supprimer
                </Button>
              </Box>
            </ModalComponent>
          }
          sx={{
            borderBottom: "1px solid #d8dee4",
            pb: 1,
          }}
        />

        {/* Content */}
        <CardContent sx={{ p: 3 }}>
          <DetailsComponent data={adminDetail} columns={columns} />

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Actions administrateur
          </Typography>
        </CardContent>

        {/* Actions GitHub-style */}
        <CardActions
          sx={{
            borderTop: "1px solid #d8dee4",
            p: 2,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <ModalComponent
            ButtonTitle="Refuser"
            ButtonColor="warning"
            Title="Refuser la demande"
            Description="Êtes-vous sûr de vouloir refuser cette demande ?"
          >
            <AddResponseAdmin data={responseAdmn} onSubmit={handleRefused} />
          </ModalComponent>

          <ModalComponent
            ButtonTitle="Valider"
            ButtonColor="success"
            Title="Valider la demande"
            Description="Confirmez-vous la validation de cette demande ?"
          >
            <AddResponseAdmin data={responseAdmn} onSubmit={handleValidation} />
          </ModalComponent>
        </CardActions>
      </Card>

      {/* Snackbar GitHub-style */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default AdminDetails;