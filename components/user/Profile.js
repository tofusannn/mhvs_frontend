import {
  Avatar,
  Badge,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Fragment, useEffect, useState } from "react";
import { Login, PhotoCamera } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import upload from "../../api/api_upload";
import auth from "../../api/api_auth";
import { useTranslations } from "next-intl";
const path = process.env.NEXT_PUBLIC_BASE_API;

const profile_payload = {
  username: "",
  password: "",
  email: "",
  phone: "",
  gender: "",
  nationality: "",
  pre_name: "",
  first_name: "",
  last_name: "",
  idcard: "",
  date_of_birth: "",
  img_id: null,
};

const Profile = ({ setPayload, setOpenSnackbar, setPayloadSnackbar }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authPayload = useSelector((state) => state.auth);
  const [profilePayload, setProfilePayload] = useState(profile_payload);
  const [imageUser, setImageUser] = useState(null);
  const [checkPhoneTh, setCheckPhoneTh] = useState(false);
  const lengthPY = authPayload.result
    ? Object.keys(authPayload.result).length
    : null;
  const t = useTranslations();
  const nationality_main = [
    {
      label: t("thailand"),
      value: "thai",
    },
    {
      label: t("myanmar"),
      value: "myanmar",
    },
    {
      label: t("laos"),
      value: "laos",
    },
    {
      label: t("cambodia"),
      value: "cambodia",
    },
  ];

  const gender_main = [
    {
      label: t("male"),
      value: "male",
    },
    {
      label: t("female"),
      value: "female",
    },
  ];
  useEffect(() => {
    setProfilePayload(lengthPY ? authPayload.result : profile_payload);
    checkImageID(lengthPY ? authPayload.result : profile_payload);
  }, [authPayload]);

  useEffect(() => {
    setPayload(profilePayload);
  }, [profilePayload]);

  // useEffect(() => {
  //   checkImageID(lengthPY ? authPayload.result : profile_payload);
  // }, [imageUser]);

  function changeField(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length < 11) {
        setProfilePayload((element) => ({ ...element, [name]: onlyNums }));
      }
      const titlePhone = value.substr(0, 2);
      if (titlePhone === "06") {
        return setCheckPhoneTh(false);
      }
      if (titlePhone === "08") {
        return setCheckPhoneTh(false);
      }
      if (titlePhone === "09") {
        return setCheckPhoneTh(false);
      }
      setCheckPhoneTh(true);
    } else if (name === "idcard") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length < 14) {
        setProfilePayload((element) => ({ ...element, [name]: onlyNums }));
      }
    } else {
      setProfilePayload((element) => ({ ...element, [name]: value }));
    }
  }

  async function checkImageID(params) {
    if (params.img_id) {
      const img = await upload.show(params.img_id);
      setImageUser(img.result.path);
    }
  }

  async function uploadImage({ target }) {
    const data = await upload.upload(target.files[0]);
    setProfilePayload((element) => ({
      ...element,
      ["img_id"]: data.result.id,
    }));
    const img = await upload.show(data.result.id);
    auth.putUser({ ...profilePayload, img_id: data.result.id });
    setImageUser(img.result.path);
    setOpenSnackbar(true);
    setPayloadSnackbar(img);
  }

  return (
    <Fragment>
      <Typography fontWeight={500} fontSize={28}>
        {t("profile-page.information")}
      </Typography>
      <Divider sx={{ marginY: 3 }}></Divider>
      <Grid container>
        <Grid xs={3} item>
          <Typography fontWeight={500} fontSize={20}>
            {t("profile-page.picture")}
          </Typography>
          <Grid my={3}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  className={classes.button_upload}
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={uploadImage}
                  />
                  <PhotoCamera />
                </IconButton>
              }
            >
              <Avatar
                src={imageUser && `${path}${imageUser}`}
                sx={{ width: 144, height: 144, background: "#EAF3FF" }}
              ></Avatar>
            </Badge>
          </Grid>
          <Typography color={"#A6ADB4"} fontSize={12}>
            - {t("profile-page.support-files")}
          </Typography>
          <Typography color={"#A6ADB4"} fontSize={12}>
            - {t("profile-page.file-size")}
          </Typography>
        </Grid>
        <Grid xs={9} item>
          <Typography sx={{ marginBottom: 3 }} fontWeight={500} fontSize={20}>
            {t("profile-page.personal-information")}
          </Typography>
          <Grid mb={3} container spacing={3}>
            <Grid item>
              <TextField
                focused
                sx={{
                  width: 195,
                  "& .MuiSelect-select .notranslate::after": t("placeholder")
                    ? {
                        content: `""`,
                        opacity: 0.42,
                      }
                    : {},
                }}
                select
                name="nationality"
                size="small"
                label={t("nationality")}
                placeholder={t("placeholder")}
                value={profilePayload.nationality}
                onChange={changeField}
              >
                {nationality_main.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                focused
                name="idcard"
                size="small"
                label={t("card-number")}
                placeholder={t("placeholder")}
                value={profilePayload.idcard}
                onChange={changeField}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                focused
                name="pre_name"
                size="small"
                label={t("register-page.title")}
                placeholder={t("placeholder")}
                value={profilePayload.pre_name}
                onChange={changeField}
              ></TextField>
            </Grid>
          </Grid>
          <Grid mb={3} container spacing={3}>
            <Grid item>
              <TextField
                focused
                name="first_name"
                size="small"
                label={t("register-page.firstname")}
                placeholder={t("placeholder")}
                value={profilePayload.first_name}
                onChange={changeField}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                focused
                name="last_name"
                size="small"
                label={t("register-page.lastname")}
                placeholder={t("placeholder")}
                value={profilePayload.last_name}
                onChange={changeField}
              ></TextField>
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  inputFormat="yyyy-MM-DD"
                  label={t("birthday")}
                  disableFuture
                  value={profilePayload.date_of_birth || null}
                  onChange={(value) => {
                    changeField({
                      target: {
                        name: "date_of_birth",
                        value: moment(value).format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      focused
                      sx={{ width: 195 }}
                      name="date_of_birth"
                      size="small"
                      onKeyDown={(e) => e.preventDefault()}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid mb={3} container spacing={3}>
            <Grid item>
              <TextField
                focused
                sx={{
                  width: 195,
                  "& .MuiSelect-select .notranslate::after": t("placeholder")
                    ? {
                        content: `""`,
                        opacity: 0.42,
                      }
                    : {},
                }}
                select
                name="gender"
                size="small"
                label={t("gender")}
                placeholder={t("placeholder")}
                value={profilePayload.gender}
                onChange={changeField}
              >
                {gender_main.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                focused
                name="phone"
                size="small"
                label={t("phone")}
                placeholder={t("placeholder")}
                error={checkPhoneTh}
                value={profilePayload.phone}
                onChange={changeField}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                focused
                name="email"
                size="small"
                label={t("email")}
                placeholder={t("placeholder")}
                value={profilePayload.email}
                onChange={changeField}
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profile;

const useStyles = makeStyles({
  button_upload: {
    background: "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%)",
    boxShadow: "0px 5px 10px #3CBB8E7A",
    color: "#ffffff",
  },
});
