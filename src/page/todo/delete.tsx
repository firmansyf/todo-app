import { deleteActivity } from "@/api";
import { ToastMessage } from "@/components/toast-message/ToastMessage";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";

export default function Delete({
  showModal,
  setShowModal,
  data,
  setReload,
  reload,
  setLoading,
  loading,
}: any) {
  const handleClose = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    setLoading(true);
    deleteActivity(data?.id)
      .then(() => {
        setReload(reload + 1);
        setShowModal(false);
        ToastMessage({
          type: "success",
          message: "Data Activity has been deleted!",
        });
      })
      .catch(() => "")
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Dialog open={showModal} handler={handleClose}>
        <DialogHeader>Delete Data {data?.title}</DialogHeader>
        <DialogBody>Are you sure want to delete data ?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            data-cy="submit-delete"
            type="submit"
            variant="gradient"
            color="blue"
            onClick={handleClick}
          >
            {loading ? <Spinner className="h-4 w-4" /> : <span>Delete</span>}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
