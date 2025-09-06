import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { ROUTES } from "@lib/constants/routes";
import { useSignInMutation } from "@store/services/account.service";
import { getError } from "@lib/helpers/general";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "@store/slices/auth-slice";
import { useDispatch } from "react-redux";

interface IFormValues {
  email: string;
  password: string;
}

const AuthContent: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormValues>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signIn] = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormValues> = async ({ email, password }) => {
    try {
      const response = await signIn({
        email,
        password,
      }).unwrap();

      if (response?.accessToken) {
        dispatch(saveAuth(response));
        toast.success("Login successful!");
        navigate(ROUTES.dashboard);
      }

    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-full md:w-1/2 bg-[#1b242c] text-white flex items-center justify-center px-6">
        <Box sx={{ width: "100%", maxWidth: 360 }}>
     
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Xplore ELD" className="w-[112px]" />
          </div>

          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
          >
            Login to your account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <TextField
              label="Email"
              placeholder="Enter email"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", { required: "Field required" })}
              slotProps={{
                input: {
                  sx: {
                    bgcolor: "#2c3440",
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: errors.email ? "#e53935" : "#444",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#666",
                    },
                  },
                },
                inputLabel: {
                  sx: { color: "#bbb" },
                },
              }}
              FormHelperTextProps={{
                sx: { color: "#e53935", fontSize: "0.8rem", mt: 0.5 },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", { required: "Field required" })}
              slotProps={{
                input: {
                  sx: {
                    bgcolor: "#2c3440",
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: errors.password ? "#e53935" : "#444",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#666",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                        sx={{ color: "#bbb" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                inputLabel: {
                  sx: { color: "#bbb" },
                },
              }}
              FormHelperTextProps={{
                sx: { color: "#e53935", fontSize: "0.8rem", mt: 0.5 },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 1,
                bgcolor: "#e53935",
                "&:hover": { bgcolor: "#d32f2f" },
                py: 1.3,
                fontWeight: "bold",
              }}
            >
              login
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "#aaa", fontSize: "0.85rem" }}
          >
            © 2025 Explore. All Rights Reserved
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default AuthContent;
