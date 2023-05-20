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
      sx={{ opacity: 0.9 }}
      open={open}
      TransitionComponent={TransitionUp}
    >
      <Card sx={{ padding: 3, color: "#ffffff", backgroundColor: "#0076FF" }}>
        <CardContent>
          <Grid item>
            <Typography fontWeight={700} fontSize={32} sx={{ marginBottom: 3 }}>
              เว็บไซต์นี้มีการใช้งานคุกกี้
            </Typography>
            <Typography fontSize={24}>
              เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพ <br />
              และประสบการณ์ที่ดีในการใช้งานเว็บไซต์ <br />
              เมื่อคุณกดยอมรับเราจะสามารถเลือกแสดงสิ่งที่น่าสนใจสำหรับคุณได้โดยเฉพาะ
            </Typography>
          </Grid>
          <Grid container mt={5}>
            <Grid item xs={12} md={6}>
              <Grid container gap={2}>
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "148px",
                      color: "#0076FF",
                      backgroundColor: "#ffffff",
                      "&:hover": {
                        color: "#0076FF",
                        backgroundColor: "#ffffff",
                      },
                    },
                  }}
                  onClick={() => onAccept()}
                >
                  ยินยอม
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", sm: "148px" },
                    color: "#ffffff",
                    borderColor: "#ffffff",
                    "&:hover": { color: "#ffffff", borderColor: "#ffffff" },
                  }}
                  onClick={() => onClose()}
                >
                  ไม่ยินยอม
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Snackbar>
  );
};

export default DialogConsent;
