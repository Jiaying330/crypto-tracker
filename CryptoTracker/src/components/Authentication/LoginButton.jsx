import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <Button
        onClick={() => loginWithRedirect()}
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
      >
        Login
      </Button>
    )
  );
}
