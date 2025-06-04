import { useContext, useRef, useState } from 'react';
// prettier-ignore
import {Modal,Box,Button,TextField,Rating,Typography, Checkbox } from "@mui/material";
import axios from 'axios';
import { context } from '../../app/App';

function GetBadge({ open, onClose }) {
  const { rendering, setIsLoading, medal, setMedal, message, setMessage } =
    useContext(context);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 360 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          新規投稿
        </Typography>
      </Box>
    </Modal>
  );
}

export default GetBadge;
