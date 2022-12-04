import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import AddTask from "../assets/icon/add-task.png";
import { createNewActivity } from "../api/api";
import * as Yup from "yup";
import { ToastMessage } from "./ToastMessage";

const schema = Yup.object().shape({
  title: Yup.string().required("New a Activity is required"),
});
function ModalAddActivity({
  showModal,
  setShowModal,
  loading,
  setLoading,
  setReloadData,
  reloadData,
}) {
  const handleOnSubmit = (values) => {
    setLoading(true);
    const params = {
      title: values.title,
      email: "yusufstudent2002@gmail.com",
    };
    createNewActivity(params)
      .then((res) => {
        setReloadData(reloadData + 1);
        setLoading(false);
        setShowModal(false);
        ToastMessage({
          type: "success",
          message: "Data Activity has been created!",
        });
      })
      .catch(() => setLoading(false));
  };

  return (
    <>
      <Modal
        size="md"
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowModal(false)}
      >
        <Formik
          initialValues={{ title: "" }}
          onSubmit={handleOnSubmit}
          validationSchema={schema}
          enableReinitialize
        >
          {({ errors }) => (
            <Form className="justify-content-center" noValidate>
              <Modal.Header>
                <Modal.Title>
                  <div className="col d-flex flex-column align-items-center icon-add text-center">
                    <img
                      src={AddTask}
                      alt="add-icon"
                      style={{ width: "50%" }}
                    />
                    <span style={{ fontSize: "15px", opacity: 0.6 }}>
                      Add a New Activity
                    </span>
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="body row">
                  <div className="col">
                    <label className="mb-2 required">Activity Name :</label>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Enter New Activity."
                      className="form-control form-control-sm form-control-sm required"
                    />
                  </div>
                  {errors.title && (
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      Activity Name is required.
                    </span>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                {!loading && (
                  <Button
                    type="submit"
                    variant="success"
                    className="btn-added btn-sm "
                  >
                    Save
                  </Button>
                )}
                {loading && (
                  <div
                    className="d-flex align-items-center"
                    style={{ fontSize: "13px" }}
                  >
                    <Spinner animation="border" variant="primary" size="sm" />{" "}
                    Please wait...{" "}
                  </div>
                )}
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default ModalAddActivity;
