import React from "react";
import { Modal, Spinner, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { updateActivity } from "./../api/api";

function ModalEditTitle({
  showModal,
  setShowModal,
  loading,
  setLoading,
  detail,
  setReload,
  reload,
}) {
  const handleOnSubmit = (value) => {
    setLoading(true);
    updateActivity(detail?.id, { title: value?.title })
      .then((res) => {
        setShowModal(false);
        setLoading(false);
        setReload(reload + 1);
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
          initialValues={{ title: detail?.title }}
          onSubmit={handleOnSubmit}
          enableReinitialize
        >
          {({ errors }) => (
            <Form className="justify-content-center" noValidate>
              <Modal.Header>
                <Modal.Title>Edit Title</Modal.Title>
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

export default ModalEditTitle;
