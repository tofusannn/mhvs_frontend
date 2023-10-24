import { Box, Button, Dialog, DialogContent, Link } from "@mui/material";
import { useTranslations } from "next-intl";

const ModalPopup = ({
  open,
  setOpen,
  textButton,
  funcButton,
  children,
  header,
}) => {
  const t = useTranslations();

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        {children}
        <Button
          sx={{
            marginTop: 3,
            height: 30,
            borderRadius: 20,
            textTransform: "none",
            fontWeight: 500,
            color: "#ffffff",
            background:
              "transparent linear-gradient(90deg, #3CBB8E 0%, #2DA373 100%) 0% 0% no-repeat padding-box",
          }}
          fullWidth
          onClick={funcButton}
        >
          {textButton}
        </Button>
        {header === "certificate" ? (
          <Box sx={{ marginTop: 2, justifyContent: "center", display: "flex" }}>
            <Link
              target="_blank"
              href="https://www.facebook.com/aorsortor.online"
            >
              {t("facebook-link")}
            </Link>
          </Box>
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalPopup;
