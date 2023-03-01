import { Facebook, Language, Message } from "@mui/icons-material";
import {
  Alert,
  Button,
  Container,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import contact from "../../api/api_contact.js";
import { useTranslations } from "next-intl";
const { Fragment, useState } = require("react");

const payload_main = {
  contact_name: "",
  contact_email: "",
  section: "",
  message: "",
};

const Home = () => {
  const [payload, setPayload] = useState(payload_main);
  const [check, setCheck] = useState(false);
  const [result, setResult] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const t = useTranslations();

  async function confirm() {
    setCheck(true);
    for (const key in payload) {
      if (payload[key] === "") {
        return;
      }
    }
    const result = await contact.postContact(payload);
    setResult(result);
    setOpenSnackbar(true);
    setCheck(false);
    setPayload(payload_main);
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  return (
    <Fragment>
      <Grid my={6} sx={{ height: "90vh" }}>
        <Container>
          <Typography fontWeight={500} fontSize={32}>
            {t("contact-text.title")}
          </Typography>
          <Grid mt={3} container justifyContent={"space-between"}>
            <Grid item>
              <Typography mb={3} color={"#727272"} fontSize={16}>
                {t("contact-text.subtitle")}
              </Typography>
              <Typography mb={3} display={"flex"} alignItems={"center"}>
                <Facebook sx={{ marginRight: 1, color: "#0076FF" }}></Facebook>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/aorsortor.online"
                >
                  Facebook Fanpage
                </Link>
              </Typography>
              <Typography mb={3} display={"flex"} alignItems={"center"}>
                <Message sx={{ marginRight: 1, color: "#0076FF" }}></Message>
                <Link target="_blank" href="https://m.me/aorsortor.online">
                  Facebook Messenger
                </Link>
              </Typography>
              <Typography mb={3} display={"flex"} alignItems={"center"}>
                <Language sx={{ marginRight: 1, color: "#0076FF" }}></Language>
                <Link
                  target="_blank"
                  href="https://www.youtube.com/channel/UC1V-Vvkf9hwtRJe5oEd-7DQ"
                >
                  Youtube Channel
                </Link>
              </Typography>
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/aorsortor.online&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="340"
                height="130"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </Grid>
            <Grid xs={5} item>
              <Grid container justifyContent={"space-between"} spacing={3}>
                <Grid xs={6} item>
                  <Typography mb={1}>
                    {t("contact-text.fullname")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    name="contact_name"
                    size="small"
                    fullWidth
                    error={check && payload.contact_name === ""}
                    value={payload.contact_name}
                    onChange={(e) =>
                      setPayload((i) => ({
                        ...i,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  ></TextField>
                </Grid>
                <Grid xs={6} item>
                  <Typography mb={1}>
                    {t("email")} <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    name="contact_email"
                    size="small"
                    fullWidth
                    error={check && payload.contact_email === ""}
                    value={payload.contact_email}
                    onChange={(e) =>
                      setPayload((i) => ({
                        ...i,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  ></TextField>
                </Grid>
              </Grid>
              <Typography mt={3} mb={1}>
                {t("contact-text.title-description")}
              </Typography>
              <TextField
                name="section"
                size="small"
                fullWidth
                value={payload.section}
                onChange={(e) =>
                  setPayload((i) => ({ ...i, [e.target.name]: e.target.value }))
                }
              ></TextField>
              <Typography mt={3} mb={1}>
                {t("contact-text.description")}
              </Typography>
              <TextField
                name="message"
                size="small"
                fullWidth
                value={payload.message}
                onChange={(e) =>
                  setPayload((i) => ({ ...i, [e.target.name]: e.target.value }))
                }
                multiline
                rows={6}
              ></TextField>
              <Button
                sx={{ marginTop: 6 }}
                variant="contained"
                onClick={confirm}
              >
                {t("contact-text.button")}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={result && result.status ? "success" : "error"}
          sx={{ width: 250 }}
        >
          {result && result.msg}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Home;
