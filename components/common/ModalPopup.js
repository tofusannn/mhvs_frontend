import { Button, Dialog, DialogContent } from "@mui/material";

const ModalPopup = ({ open, setOpen, textButton, funcButton, children }) => {
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
      </DialogContent>
    </Dialog>
  );
};

export default ModalPopup;
