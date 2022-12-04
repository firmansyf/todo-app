import React, { useState, useCallback, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { getAllActivity, deleteActivity } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEye,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import ModalComponent from "./../components/ModalDelete";
import NoData from "../assets/icon/not-data.png";
import { useNavigate } from "react-router-dom";
import Logo1 from "../assets/icon/logo-1.png";
import ModalAddActivity from "./../components/ModalAdd";
import { ToastMessage } from "../components/ToastMessage";

function Main() {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [isData, setDataActivity] = useState([]);
  const [reloadData, setReloadData] = useState(0);
  const [showModalDel, setShowModalDel] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [idActivity, setIdActivity] = useState();

  useEffect(() => {
    getAllActivity()
      .then(({ data: res }) => {
        const { data } = res;
        setDataActivity(data);
      })
      .catch(() => "");
  }, [reloadData]);

  useEffect(() => {
    document.title = "TO DO APP";
  }, []);

  const handleDelete = useCallback(() => {
    setLoadingDel(true);
    deleteActivity(idActivity)
      .then((res) => {
        setReloadData(reloadData + 1);
        setShowModalDel(false);
        setLoadingDel(false);
        ToastMessage({
          type: "success",
          message: "Data Activity has been deleted!",
        });
      })
      .catch(() => setLoadingDel(false));
  }, [idActivity, reloadData]);

  const handleSort = () => {
    const sorted = [...isData]?.sort((a, b) => (a > b ? 1 : -1));
    setDataActivity(sorted);
  };

  return (
    <>
      <div className="container mb-4 d-flex justify-content-center flex-column align-items-center section-responsive mt-5">
        <div className="logo-header d-flex justify-content-center align-items-center">
          <img src={Logo1} style={{ width: "10rem" }} alt="img" />
          <div className="text-header">
            <span>
              ,,Goodbye Wasted Time, <br /> Hello Productivity!
            </span>
          </div>
        </div>

        <div
          className="mt-3 shadow d-flex flex-column section-card-todo"
          style={{ borderRadius: "10px" }}
        >
          <div className="mx-3 mt-3">
            <span style={{ fontSize: "13px" }}>
              Easy to learn, Hard to master
            </span>
          </div>
          <div className="m-3 d-flex justify-content-between">
            <button
              className="border-bottom btn btn-sm btn-success d-flex justify-content-center "
              style={{ width: 100 }}
              onClick={() => handleSort()}
            >
              <span>Sort</span>
              <div className="mx-2">
                <FontAwesomeIcon icon={faArrowUp} size="md" />
                <FontAwesomeIcon icon={faArrowDown} size="md" />
              </div>
            </button>

            <button
              onClick={() => setShowModalAdd(true)}
              className="btn-added btn btn-sm btn-outline-success"
            >
              + Add a New Activity
            </button>
          </div>

          <div className="content-todo d-flex flex-column mx-3 mb-3">
            {isData.length === 0 ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={NoData} alt="no-data" style={{ width: 200 }} />
                <span style={{ opacity: ".5", fontSize: "13px" }}>
                  Not Data Added
                </span>
              </div>
            ) : (
              Array.isArray(isData) &&
              isData.map(({ id, created_at, title }) => {
                return (
                  <>
                    <div
                      className="m-2 p-3 shadow-sm d-flex align-items-center justify-content-between"
                      style={{ borderRadius: "50px", backgroundColor: "#EEE" }}
                    >
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="clear"
                          id={`checked-is-${id}`}
                          className="mx-1 checkbox-activity shadow"
                          onChange={({ target }) => {
                            setIsChecked(
                              target?.checked === true ? target?.id : false
                            );
                          }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                          className={`${
                            isChecked === `checked-is-${id}`
                              ? "text-decoration-line-through"
                              : ""
                          }`}
                        >
                          {title},
                        </span>
                        <span
                          style={{ fontSize: "12px", opacity: 0.7 }}
                          className="mx-1"
                        >
                          {moment(created_at).format("LLL")}
                        </span>
                      </div>
                      <div className="button-action d-flex">
                        <OverlayTrigger
                          placement="left"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id="button-tooltip-2">Detail</Tooltip>
                          }
                        >
                          <button
                            className="bg-light shadow mx-2"
                            onClick={() => {
                              history(`/detail/${id}`);
                            }}
                            style={{ border: "none", borderRadius: "10px" }}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="text-success"
                            />
                          </button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id="button-tooltip-2">Delete</Tooltip>
                          }
                        >
                          <button
                            className="bg-light shadow"
                            onClick={() => {
                              setShowModalDel(true);
                              setIdActivity(id);
                            }}
                            style={{ border: "none", borderRadius: "10px" }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-danger"
                            />
                          </button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>

      <ModalComponent
        loading={loadingDel}
        icon={faTrash}
        showModal={showModalDel}
        setShowModal={setShowModalDel}
        confirmLabel={"Delete"}
        color={"danger"}
        title={"Delete Activity"}
        body={"Are you sure you want to delete data!"}
        onConfirm={handleDelete}
        onCancel={() => setShowModalDel(false)}
      />
      <ModalAddActivity
        setLoading={setLoading}
        loading={loading}
        setReloadData={setReloadData}
        reloadData={reloadData}
        showModal={showModalAdd}
        setShowModal={setShowModalAdd}
      />
    </>
  );
}

export default Main;
