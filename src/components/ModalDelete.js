import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalComponent({
  body,
  title,
  onConfirm,
  onCancel,
  loading,
  showModal,
  setShowModal,
  confirmLabel,
  color,
  icon,
}) {
  return (
    <>
      <Modal
        size="md"
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <FontAwesomeIcon
              icon={icon}
              size="6x"
              className={`text-${color}`}
            />
            <div className="mt-3">{body}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={`btn-sm btn-${color}`}
            type="submit"
            variant={color}
            disabled={loading}
            onClick={onConfirm}
          >
            {!loading && (
              <span className="indicator-label">{confirmLabel}</span>
            )}
            {loading && (
              <Spinner animation="border" size="sm" variant="light" />
            )}
          </Button>
          <Button className="btn-sm btn-secondary" onClick={onCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
