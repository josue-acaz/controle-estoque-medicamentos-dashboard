import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";

// types
import {SnackbarFeedbackProps} from "./types";

// styles
import {SnackbarView} from "./styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackbarFeedback({
  severity, 
  handleClose, 
  open, 
  msg, 
  autoHideDuration=6000,
}: SnackbarFeedbackProps) {

  const classes = useStyles();

  const colors = {
    info: "Operação terminou com informação.",
    error: "Operação terminou com erro.",
    warning: "Operação terminou com aviso.",
    success: "Operação terminou com êxito.",
  };

  return (
    <SnackbarView className={classes.root}>
      <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {msg ? msg : colors[severity]}
        </Alert>
      </Snackbar>
    </SnackbarView>
  );
}
