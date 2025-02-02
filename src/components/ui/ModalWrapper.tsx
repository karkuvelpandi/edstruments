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
  maxWidth = 'sm',
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
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 'auto' },
            maxWidth: maxWidth,
            bgcolor: backgroundColor,
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            outline: 0,
          }}
        >
          {/* Title and Close Button */}
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

          {/* Modal Body */}
          <Box sx={{ mt: 2 }}>{children}</Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalWrapper;
