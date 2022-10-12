import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Dialog, DialogTitle,Stack, DialogContent,DialogActions,Button, TextField } from "@mui/material";
const AddCarDialog = ({open, onClose, selectedBrand, brands}) => {
  const [itemProps, setItemProps] = useState({})
  const addItem = () => {

  }

  return (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Добавление нового авто"}
        </DialogTitle>
        <DialogContent>
          <Stack direction='column' spacing={2}>
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={() => addItem(itemProps)}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default AddCarDialog;