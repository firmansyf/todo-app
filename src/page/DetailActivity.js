import React, { useEffect, useState } from "react";
import {
  getDataTodoActivityById,
  getActivityById,
  deleteToDo,
  updateToDo,
} from "../api/api";
import Agree from "../assets/icon/agree.png";
import moment from "moment/moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalAddToDo from "./../components/ModalAddToDo";
import NoTodo from "../assets/icon/no-todo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftLong,
  faChevronCircleUp,
  faChevronUp,
  faChevronDown,
  faAnglesDown,
  faBars,
  faTrash,
  faPen,
  faArrowUpAZ,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./../components/ModalDelete";
import ModalEditTitle from "./../components/ModalEditTitle";
import { ToastMessage } from "../components/ToastMessage";

function DetailActivity() {
  const link = useNavigate();
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDel, setShowModalDel] = useState(false);
  const [reloadData, setReloadData] = useState(0);
  const [loadingDel, setLoadingDel] = useState(false);
  const [titleShow, setTitleShow] = useState(false);
  const [dataTodo, setDataTodo] = useState({});
  const [order, setOrder] = useState("asc");

  const [guid, setGuid] = useState();
  const getId = window.location.pathname.slice(8);

  useEffect(() => {
    document.title = `${detail?.title || "-"}`;
  }, [detail]);

  useEffect(() => {
    getActivityById(getId)
      .then(({ data: res }) => {
        setDetail(res);
      })
      .catch(() => "");
  }, [getId, reloadData]);

  useEffect(() => {
    getDataTodoActivityById(getId)
      .then(({ data: res }) => {
        setData(res?.data);
      })
      .catch(() => "");
  }, [getId, reloadData]);

  const handleDelete = () => {
    setLoadingDel(true);
    deleteToDo(guid)
      .then((res) => {
        setLoadingDel(false);
        setShowModalDel(false);
        setReloadData(reloadData + 1);
        ToastMessage({ type: "success", message: "data has been deleted!" });
      })
      .catch(() => setLoadingDel(false));
  };

  const handleChange = (item) => {
    const params = {
      is_active: item?.is_active ? 0 : 1,
    };
    updateToDo(item?.id, params)
      .then((res) => {
        setReloadData(reloadData + 1);
      })
      .catch(() => "");
  };

  const handleSort = () => {
    // if (col === "terbaru") {
    //   const sorted = [...data]?.sort((a, b) =>
    //     a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
    //   );
    //   setData(sorted);
    // }

    const sorted = [...data]?.sort((a, b) => (a > b ? 1 : -1));
    setData(sorted);
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center section-detail align-items-center">
        <div className="m-4 section-logo-detail d-flex justify-content-center align-items-center">
          <img
            src={Agree}
            alt="agree-logo"
            className="agree-logo"
            // style={{ width: "20rem" }}
          />
          <div className="d-flex flex-column">
            <span className="mb-2">
              {detail?.title}{" "}
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 300 }}
                overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}
              >
                <button
                  className="bg-light shadow-sm"
                  style={{ border: "none", borderRadius: "50px" }}
                  onClick={() => setTitleShow(true)}
                >
                  <FontAwesomeIcon icon={faPen} className="text-success" />
                </button>
              </OverlayTrigger>
            </span>
            <span className="" style={{ fontSize: "13px" }}>
              Created at :{" "}
              <strong
                className="text-dark badge"
                style={{ backgroundColor: "#eee" }}
              >
                {moment(detail?.created_at).format("LL")}
              </strong>
            </span>
          </div>
        </div>

        <div
          className="card shadow d-flex flex-column section-card-todo"
          style={{ borderRadius: "10px", border: "none" }}
        >
          <div
            className="card-header tombol-add m-3 d-flex justify-content-between"
            style={{ backgroundColor: "#fff" }}
          >
            <button className="btn btn-sm" onClick={() => link("/")}>
              <FontAwesomeIcon icon={faLeftLong} /> Back
            </button>
            <div className="d-flex">
              <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Sort</Tooltip>}
              >
                <div
                  className="mx-2 p-1 shadow-sm rounded-pill"
                  style={{ cursor: "pointer", backgroundColor: "#eee" }}
                  onClick={() => handleSort()}
                >
                  <FontAwesomeIcon icon={faArrowUpAZ} size="lg" />
                </div>
              </OverlayTrigger>
              <button
                className="badge bg-success"
                style={{ border: "none" }}
                onClick={() => {
                  setShowModalAdd(true);
                  setDataTodo(undefined);
                }}
              >
                Add To Do
              </button>
            </div>
          </div>
          <div className="d-flex flex-column content-data-todo m-3">
            {data.length === 0 ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={NoTodo} alt="no-data" style={{ width: 200 }} />
                <span style={{ opacity: ".5", fontSize: "13px" }}>
                  Not Data Added
                </span>
              </div>
            ) : (
              Array.isArray(data) &&
              data?.map((item, i) => {
                return (
                  <>
                    <div
                      className="d-flex justify-content-between section-content"
                      key={i}
                    >
                      <div className="d-flex content-list-todo">
                        <input
                          className="mx-2 checkbox-activity"
                          type="checkbox"
                          checked={item?.is_active === 0 ? true : false}
                          onChange={() => handleChange(item)}
                        />

                        {item?.is_active === 0 ? (
                          <span
                            className="text-decoration-line-through"
                            style={{ opacity: 0.5 }}
                          >
                            {item?.title}
                          </span>
                        ) : (
                          <span>{item?.title}</span>
                        )}

                        {item?.priority === "very-high" && (
                          <div
                            className="d-flex align-items-center mx-2 badge"
                            style={{ backgroundColor: "#EEE" }}
                          >
                            <FontAwesomeIcon
                              icon={faChevronCircleUp}
                              className="text-danger"
                            />
                            <span className="mx-1 text-dark">Very Height</span>
                          </div>
                        )}
                        {item?.priority === "high" && (
                          <div
                            className="d-flex align-items-center mx-2 badge"
                            style={{ backgroundColor: "#EEE" }}
                          >
                            <FontAwesomeIcon
                              icon={faChevronUp}
                              className="text-danger"
                            />
                            <span className="mx-1 text-dark">Heigh</span>
                          </div>
                        )}
                        {item?.priority === "normal" && (
                          <div
                            className="d-flex align-items-center mx-2 badge"
                            style={{ backgroundColor: "#EEE" }}
                          >
                            <FontAwesomeIcon
                              icon={faBars}
                              className="text-warning"
                            />
                            <span className="mx-1 text-dark">Medium</span>
                          </div>
                        )}
                        {item?.priority === "low" && (
                          <div
                            className="d-flex align-items-center mx-2 badge"
                            style={{ backgroundColor: "#EEE" }}
                          >
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              style={{ backgroundColor: "#9F20C9" }}
                            />
                            <span className="mx-1 text-dark">Low</span>
                          </div>
                        )}
                        {item?.priority === "very-low" && (
                          <div
                            className="d-flex align-items-center mx-2 badge"
                            style={{ backgroundColor: "#EEE" }}
                          >
                            <FontAwesomeIcon
                              icon={faAnglesDown}
                              style={{ backgroundColor: "#9F20C9" }}
                            />
                            <span className="mx-1 text-dark">Very Low</span>
                          </div>
                        )}
                      </div>
                      <div className="tombol-action d-flex">
                        <button
                          className="mx-1 badge bg-warning"
                          style={{ border: "none" }}
                          onClick={() => {
                            setShowModalAdd(true);
                            setDataTodo(item);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            className="text-white"
                          />
                          &nbsp; Edit
                        </button>
                        <button
                          className="mx-1 badge bg-danger"
                          style={{ border: "none" }}
                          onClick={() => {
                            setShowModalDel(true);
                            setGuid(item?.id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-white"
                          />
                          &nbsp; Delete
                        </button>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>

      <ModalAddToDo
        id={getId}
        setReload={setReloadData}
        reload={reloadData}
        setLoading={setLoading}
        setShowModal={setShowModalAdd}
        showModal={showModalAdd}
        loading={loading}
        detail={dataTodo}
      />

      <ModalComponent
        loading={loadingDel}
        icon={faTrash}
        showModal={showModalDel}
        setShowModal={setShowModalDel}
        confirmLabel={"Delete"}
        color={"danger"}
        title={"Delete To Do"}
        body={"Are you sure you want to delete data!"}
        onConfirm={handleDelete}
        onCancel={() => setShowModalDel(false)}
      />

      <ModalEditTitle
        setShowModal={setTitleShow}
        showModal={titleShow}
        setReload={setReloadData}
        reload={reloadData}
        loading={loading}
        setLoading={setLoading}
        detail={detail}
      />
    </>
  );
}

export default DetailActivity;
