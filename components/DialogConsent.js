import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Slide,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const DialogConsent = () => {
  const [open, setOpen] = useState(true);
  const allow = Cookies.get("allow-cookie");

  useEffect(() => {
    if (allow === "allow") {
      setOpen(false);
    }
  }, []);

  const onAccept = () => {
    Cookies.set("allow-cookie", "allow");
    setOpen(false);
  };

  const onClose = () => {
    Cookies.set("allow-cookie", "allow");
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={TransitionUp}
    >
      <Card sx={{ color: "#ffffff", backgroundColor: "#333" }}>
        <CardContent sx={{ padding: "14px" }}>
          <Grid
            item
            sx={{
              "& a": {
                color: "#1a936f",
              },
            }}
          >
            <Typography fontWeight={700} fontSize={28} mb={1}>
              Cookie Consent
            </Typography>
            <Typography fontSize={14}>
              Essential cookies are enabled by default to give you the best
              <br />
              possible site experience. For details on our Cookie policy, please
              <br />
              read our <Link href="/">privacy policy.</Link>
            </Typography>
          </Grid>
          <Grid container mt={1} gap={1} justifyContent={"end"}>
            <Button
              variant="contained"
              sx={{
                width: { xs: "100%", sm: "100px" },
                color: "#ffffff",
                backgroundColor: "#5c5c5c",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  color: "#ffffff",
                  boxShadow: "none",
                  backgroundColor: "#5c5c5c",
                },
              }}
              onClick={() => onClose()}
            >
              Decline
            </Button>
            <Button
              variant="contained"
              sx={{
                width: {
                  xs: "100%",
                  sm: "100px",
                  color: "#ffffff",
                  backgroundColor: "#1a936f",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    color: "#ffffff",
                    boxShadow: "none",
                    backgroundColor: "#1a936f",
                  },
                },
              }}
              onClick={() => onAccept()}
            >
              Accept
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Snackbar>
  );
};

export default DialogConsent;
