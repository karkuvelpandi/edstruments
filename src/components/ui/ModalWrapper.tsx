import React, { ReactNode } from 'react';
import { Modal, Backdrop, Fade, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
  hideCloseButton?: boolean;
  backgroundColor?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth,
  hideCloseButton = false,
  backgroundColor = 'white',
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
        <Box
        sx={{
          position: 'relative',
          minWidth: 300,
          maxWidth: maxWidth || '90%',
          mx: 'auto',
          bgcolor: backgroundColor,
          zIndex: 1000,
          height: "90vh",
          padding: "20px",
          mt: "5vh",
        }}
        >
          {title && (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{title}</Typography>
              {!hideCloseButton && (
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          )}
          <Box sx={{ mt: 2, position: "relative", height:'78vh' }}>{children}</Box>
        </Box>
    </Modal>
  );
};

export default ModalWrapper;
