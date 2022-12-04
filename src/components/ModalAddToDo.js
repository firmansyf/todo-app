import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import { createToDoActivity, updateToDo } from "./../api/api";
import { ToastMessage } from "./ToastMessage";

const OptPriority = [
  { value: "very-high", label: "Very Heigh" },
  { value: "high", label: "Heigh" },
  { value: "normal", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "very-low", label: "Very Low" },
];

export default function ModalAddToDo({
  showModal,
  setShowModal,
  loading,
  setLoading,
  setReload,
  reload,
  detail,
  id,
}) {
  const handleOnSubmit = (values) => {
    setLoading(true);
    const params = {
      activity_group_id: id,
      title: values?.title,
      priority: values?.priority,
    };

    if (detail?.id) {
      updateToDo(detail?.id, params)
        .then((res) => {
          setLoading(false);
          setShowModal(false);
          setReload(reload + 1);
          ToastMessage({ type: "success", message: "Data has been update!" });
        })
        .catch(() => setLoading(false));
    } else {
      createToDoActivity(params)
        .then((res) => {
          setLoading(false);
          setShowModal(false);
          setReload(reload + 1);
          ToastMessage({ type: "success", message: "Data has been added!" });
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowModal(false)}
      >
        <Formik
          initialValues={{ title: detail?.title, priority: detail?.priority }}
          onSubmit={handleOnSubmit}
          enableReinitialize
        >
          {({ errors, setFieldValue, values }) => (
            <Form className="justify-content-center" noValidate>
              <Modal.Header>
                <Modal.Title>{detail?.id ? "Edit" : "Add"} To Do</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="body row">
                  <div className="col">
                    <label className="mb-1 required">Name :</label>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Enter New Activity."
                      className="form-control  form-control-solid required"
                    />
                  </div>
                  {errors.title && (
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      Activity Name is required.
                    </span>
                  )}
                </div>

                <div className="row mt-2">
                  <div className="col">
                    <label className="required mb-1">Priority :</label>
                    <Select
                      options={OptPriority}
                      name="priority"
                      placeholder="Select Priority."
                      value={OptPriority.find(
                        ({ value }) => value === values?.priority
                      )}
                      onChange={(e) => {
                        setFieldValue("priority", e?.value);
                      }}
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
