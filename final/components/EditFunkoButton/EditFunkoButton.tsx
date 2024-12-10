import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FunkoProps } from '../../types/funko';
import { EditFunkoProps } from '../../types/funko';

const EditFunkoButton: React.FC<EditFunkoProps> = ({ funko }) => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    imageUrl: funko.imageUrl,
    show: funko.tvShow,
    character: funko.character,
    yearReleased: funko.yearReleased,
    numberInLine: funko.numberInLine,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formValues);
    handleClose(); // Close the dialog after submission
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="imageUrl"
            label="Image URL"
            type="url"
            fullWidth
            value={formValues.imageUrl}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="tvShow"
            label="TV/Movie Show"
            type="text"
            fullWidth
            value={formValues.show}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="character"
            label="Character"
            type="text"
            fullWidth
            value={formValues.character}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="yearReleased"
            label="Year Released"
            type="number"
            fullWidth
            value={formValues.yearReleased}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="numberInLine"
            label="Number In Line"
            type="number"
            fullWidth
            value={formValues.numberInLine}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditFunkoButton;
