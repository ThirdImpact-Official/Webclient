import { Button, Modal, Typography, Box, Fade, Backdrop } from "@mui/material";
import React, { FC, useState } from "react";

interface ModalProps {
  ButtonColor?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  ButtonTitle?: string;
  children: React.ReactNode;
  Title: string;
  Description: string;
  Method?: () => void;
}

const ModalComponent: FC<ModalProps> = ({
  children,
  Method,
  ButtonTitle = "Open Modal",
  Title,
  Description,
  ButtonColor
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    Method?.();
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* GitHub-style button */}
      <Button
        variant="outlined"
        color={ButtonColor}
        onClick={handleOpen}
        sx={{
          borderColor: "#d0d7de",
          color: "#24292f",
          textTransform: "none",
          backgroundColor: "#f6f8fa",
          "&:hover": {
            backgroundColor: "#f3f4f6",
            borderColor: "#b9c1c9"
          }
        }}
      >
        {ButtonTitle}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
            sx: {
              backgroundColor: "rgba(27,31,36,0.5)" // GitHub overlay
            }
          }
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#f6f8fa",
              border: "1px solid #d0d7de",
              borderRadius: "6px",
              boxShadow: "0 8px 24px rgba(140,149,159,0.2)",
              p: 4,
              width: { xs: "90%", sm: 420 },
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              textAlign="center"
              sx={{ color: "#24292f", fontWeight: 600 }}
            >
              {Title}
            </Typography>

            {Description && (
              <Typography
                sx={{
                  mt: 2,
                  textAlign: "center",
                  color: "#57606a"
                }}
              >
                {Description}
              </Typography>
            )}

            {children && <Box sx={{ mt: 3 }}>{children}</Box>}

            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  backgroundColor: "#2da44e",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#2c974b"
                  }
                }}
              >
                Fermer
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalComponent;
