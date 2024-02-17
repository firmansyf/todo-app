import { updateActivity } from "@/api";
import { ToastMessage } from "@/components/toast-message/ToastMessage";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { Field, Formik, Form } from "formik";

export default function Edit({
  showModal,
  setShowModal,
  data,
  setReload,
  reload,
  setLoading,
  loading,
}: any) {
  const handleOnSubmit = (val: any) => {
    setLoading(true);
    updateActivity(data?.id, { title: val?.title })
      .then(() => {
        setShowModal(false);
        ToastMessage({ type: "success", message: `Data has been update!` });
        setReload(reload + 1);
      })
      .catch(() => "")
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Dialog open={showModal} handler={handleClose}>
        <Formik
          onSubmit={handleOnSubmit}
          enableReinitialize
          initialValues={{ title: data?.title }}
        >
          {() => {
            return (
              <>
                <Form>
                  <DialogHeader>Edit Data</DialogHeader>
                  <DialogBody>
                    <label>Activity</label>
                    <Field
                      data-cy="form-input-edit"
                      type="text"
                      name="title"
                      className="w-full bg-opacity-50 rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
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
                        <span>Save</span>
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
}
