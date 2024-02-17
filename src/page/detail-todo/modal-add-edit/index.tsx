import { FC } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { Formik, Field, Form } from "formik";
import { createToDoActivity, updateToDoActivity } from "@/api";
import { ToastMessage } from "@/components/toast-message/ToastMessage";

type Props = {
  id: number;
  showModal: boolean;
  setShowModal: any;
  setReload: any;
  reload: any;
  loading: any;
  setLoading: any;
  itemDetail: any;
  setItemDetail: any;
};

const ModalAddEdit: FC<Props> = ({
  showModal,
  setShowModal,
  id,
  setReload,
  reload,
  loading,
  setLoading,
  itemDetail,
  setItemDetail,
}) => {
  const handleOnSubmit = (val: any) => {
    setLoading(true);
    const params = {
      activity_group_id: id,
      title: val?.title,
      priority: val?.priority,
    };

    if (itemDetail?.id) {
      updateToDoActivity(itemDetail?.id, params)
        .then(() => {
          setLoading(false);
          setShowModal(false);
          setReload(reload + 1);
          ToastMessage({ type: "success", message: "Data has been update!" });
        })
        .catch(() => setLoading(false));
    } else {
      createToDoActivity(params)
        .then(() => {
          setLoading(false);
          setShowModal(false);
          setReload(reload + 1);
          ToastMessage({ type: "success", message: "Data has been added!" });
        })
        .catch(() => setLoading(false));
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setItemDetail([]);
  };

  return (
    <>
      <Dialog open={showModal} handler={handleClose}>
        <Formik
          onSubmit={handleOnSubmit}
          initialValues={{
            title: itemDetail?.title,
            priority: itemDetail?.priority,
          }}
          enableReinitialize
        >
          {({ errors }) => {
            console.log("er: ", errors);
            return (
              <>
                <Form>
                  <DialogHeader>
                    Modal {itemDetail?.id ? "Edit" : "Add"}
                  </DialogHeader>
                  <DialogBody className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-bold required-field">Name</label>
                      <Field
                        required
                        name="title"
                        placeholder="Enter Title"
                        className="w-full bg-opacity-50 rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-bold required-field">
                        Priority
                      </label>
                      <Field
                        required
                        as="select"
                        name="priority"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option value=""> Select Priority</option>
                        <option value="high">Hight</option>
                        <option value="normal">Medium</option>
                        <option value="low">Low</option>
                      </Field>
                    </div>
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
                    <Button type="submit" variant="gradient" color="blue">
                      {loading ? (
                        <Spinner className="h-4 w-4" />
                      ) : (
                        <span>{itemDetail?.id ? "Edit" : "Add"}</span>
                      )}
                    </Button>
                  </DialogFooter>
                </Form>
              </>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
};

export { ModalAddEdit };
