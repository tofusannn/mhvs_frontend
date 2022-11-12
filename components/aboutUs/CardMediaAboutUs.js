import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const CardMediaAboutUs = (props) => {
  const { image, title, detail, link, setOpenModal, setYoutube } = props;
  const classes = useStyles();

  return (
    <Card className={classes.aboutUsCard}>
      <CardMedia component="img" image={image} alt="image card"></CardMedia>
      <CardContent>
        <Typography mb={3} fontWeight={500} fontSize={18}>
          {title}
        </Typography>
        {/* <Typography mb={3} fontSize={16}>
          {detail}
        </Typography> */}
        <Link
          component={"button"}
          sx={{
            color: "#2DA373",
            fontWeight: 500,
            fontSize: 14,
            textDecoration: "none",
          }}
          onClick={() => {
            setOpenModal(true);
            setYoutube(link);
          }}
        >
          ดูเพิ่มเติม
        </Link>
      </CardContent>
    </Card>
  );
};

export default CardMediaAboutUs;

const useStyles = makeStyles({
  aboutUsCard: {
    height: "100%",
    minWidth: 300,
    minHeight: 435,
    maxWidth: 300,
    maxHeight: 435,
    boxShadow: "10px 5px 20px #0000001A",
    borderRadius: 8,
  },
});
