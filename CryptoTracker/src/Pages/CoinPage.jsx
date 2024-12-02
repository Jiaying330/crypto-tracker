import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { useState, useEffect } from "react";
import { Button, LinearProgress, Typography } from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "../components/CoinsTable";
import { styled } from "@mui/material/styles";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const Heading = styled(Typography)({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
});

const Description = styled(Typography)({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
});

const MarketData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

export default function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const inWatchlist = watchlist.includes(coin?.id);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoin(data);
  };

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });
      setAlert({
        open: true,
        type: "success",
        message: `${coin.name} Added to the watchlist !`,
      });
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        message: error.message,
      });
    }
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => {
            // console.log(`watch = ${watch}`, `coin id = ${coin.id}`);
            watch !== coin?.id;
          }),
        },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 2 }}
        />
        <Heading variant="h3">{coin?.name}</Heading>
        <Description variant="subtitle1">
          {coin?.description.en.split(". ")[0]}.
        </Description>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">
              Rank: &nbsp; &nbsp;
              <Typography
                variant="h5"
                sx={{ fontFamily: "Montserrat", display: "inline" }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </Heading>
          </span>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">
              Current Price:&nbsp; &nbsp;
              <Typography
                variant="h5"
                sx={{ fontFamily: "Montserrat", display: "inline" }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </Heading>
          </span>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">
              Market Cap&nbsp; &nbsp;
              <Typography
                variant="h5"
                sx={{ fontFamily: "Montserrat", display: "inline" }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
              </Typography>
            </Heading>
          </span>
          {user && (
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
}
