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

const CardMediaAboutUs = (props) => {
  const { image, title, link } = props;
  const classes = useStyles();

  return (
    <Card className={classes.aboutUsCard}>
      <CardMedia component="img" image={image} alt="image card"></CardMedia>
      <CardContent>
        <Typography mb={3} fontWeight={500} fontSize={18}>
          {title}
        </Typography>
        <Link
          href="#"
          sx={{
            color: "#2DA373",
            fontWeight: 500,
            fontSize: 14,
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Share
        </Link>
      </CardContent>
    </Card>
  );
};

export default CardMediaAboutUs;

const useStyles = makeStyles({
  aboutUsCard: {
    height: "100%",
    maxWidth: 300,
    maxHeight: 435,
    boxShadow: "10px 5px 20px #0000001A",
    borderRadius: 8,
  },
});
