import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Button
        onClick={() => logout()}
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
      >
        Sign Out
      </Button>
    )
  );
}
