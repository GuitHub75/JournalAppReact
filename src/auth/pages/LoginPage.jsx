import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { chekingAuthentication,startgGoogleSigIn,startLoginWithEmailPassword } from "../../store/auth/";
import { green } from "@mui/material/colors";

const formData = {
  email: '',
  password : ''
}

export const LoginPage = () => {
    
   const {status,errrorMessage} = useSelector(state => state.auth);  
    
   const dispatch = useDispatch();
   const {email, password, onInputChange , formState} = useForm(formData);

  const isAuthenticating = useMemo(()=> status === 'cheking',[status]);

  const onSubmit = (event) =>{
    event.preventDefault();
   // console.log({email,password});

    dispatch(startLoginWithEmailPassword({email, password}));
  }

   const onGoogleSingIn = () => {
    console.log("Gooogle");
    dispatch(startgGoogleSigIn());
  }

  return (
    <AuthLayout title="login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <TextField
              label="correo"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <TextField
              label="contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item sx={{ mt: 1 }} xs={12} sm={12} display={!!errrorMessage ? "" : "none" }>
              <Alert severity="error">{errrorMessage}</Alert>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button 
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth>
                <Typography sx={{ ml: 1 }}>LOGIN</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                     disabled={isAuthenticating}
                     variant="contained"
                     fullWidth 
                     onClick={onGoogleSingIn}
                >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
