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
            ติดต่อเรา
          </Typography>
          <Grid mt={3} container justifyContent={"space-between"}>
            <Grid item>
              <Typography mb={3} color={"#727272"} fontSize={16}>
                มิตรไทย โดย เครือข่ายองค์กรด้านประชากรข้ามชาติ
              </Typography>
              <Typography mb={3} display={"flex"} alignItems={"center"}>
                <Facebook sx={{ marginRight: 1, color: "#0076FF" }}></Facebook>
                <Link href="https://www.facebook.com/mwgthailand">
                  Migrant Working Group
                </Link>
              </Typography>
              <Typography mb={3} display={"flex"} alignItems={"center"}>
                <Message sx={{ marginRight: 1, color: "#0076FF" }}></Message>
                <Link href="https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2Fmwgthailand">
                  MWG Thailand
                </Link>
              </Typography>
              <Typography mb={3} display={"flex"} alignItems={"center"}>
                <Language sx={{ marginRight: 1, color: "#0076FF" }}></Language>
                <Link href="https://mitrthai.com/employees/">MitrThai.com</Link>
              </Typography>
            </Grid>
            <Grid xs={5} item>
              <Grid container justifyContent={"space-between"} spacing={3}>
                <Grid xs={6} item>
                  <Typography mb={1}>
                    ชื่อจริง - นามสกุล <span style={{ color: "red" }}>*</span>
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
                    อีเมล <span style={{ color: "red" }}>*</span>
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
                หัวข้อที่ต้องการติดต่อ
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
                ข้อความ
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
                ส่งข้อความ
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
