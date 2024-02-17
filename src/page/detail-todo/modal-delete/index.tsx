import { FC } from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { ToastMessage } from "@/components/toast-message/ToastMessage";
import { deleteToDoActivity } from "@/api";

type Props = {
  showModal: boolean;
  setShowModal: any;
  itemDetail: any;
  setReload: any;
  reload: any;
  setLoading: any;
  loading: boolean;
  setItemDetail: any;
};

const ModalDelete: FC<Props> = ({
  showModal,
  setShowModal,
  itemDetail,
  setReload,
  reload,
  setLoading,
  loading,
  setItemDetail,
}) => {
  const handleClose = () => {
    setShowModal(false);
    setItemDetail([]);
  };

  const handleClick = () => {
    setLoading(true);
    deleteToDoActivity(itemDetail?.id)
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
        <DialogHeader>Delete Data </DialogHeader>
        <DialogBody>
          Are you sure want to delete data{" "}
          <strong className="font-bold">{itemDetail?.title}</strong>?
        </DialogBody>
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
};

export { ModalDelete };
