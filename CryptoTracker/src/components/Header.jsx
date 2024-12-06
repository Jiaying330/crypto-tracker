import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import UserSidebar from "./Authentication/UserSidebar";
import AuthModal from "./Authentication/AuthModal";
import LoginButton from "./Authentication/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const { currency, setCurrency } = CryptoState();
  const { user, isAuthenticated } = useAuth0();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              sx={{
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              variant="h6"
            >
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"CNY"}>CNY</MenuItem>
            </Select>
            {isAuthenticated ? <UserSidebar /> : <LoginButton />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
