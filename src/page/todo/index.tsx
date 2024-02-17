import { getAllActivity, createNewActivity } from "@/api";
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import moment from "moment";
import { useEffect, useState, createElement } from "react";
import lostPage from "@/assets/lost-page.png";
import Pagination from "@/components/pagination/Pagination";
import Edit from "@/page/todo/edit";
import Delete from "@/page/todo/delete";
import { ToastMessage } from "@/components/toast-message/ToastMessage";
import { useNavigate } from "react-router-dom";
import { Section } from "@/components/layout/section";
import { CheckboxDone } from "@/components/checkbox/Checkbox";
import { Tooltip } from "@material-tailwind/react";

function Todo() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputItem, setInputItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [reloadData, setReloadData] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDel, setShowModalDel] = useState<boolean>(false);
  const [detail, setDetail] = useState<any>();
  const [erorrFieldAdd, setErrorFieldAdd] = useState<any>(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Function search
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData?.slice(startIndex, endIndex);

  // Fetching Data
  useEffect(() => {
    getAllActivity()
      .then(({ data: { data: res } }) => {
        setData(res);
      })
      .catch(() => console.log("Feetching Data Error"));
  }, [reloadData]);

  // Handle onClick
  const handleOnClick = () => {
    const params = {
      title: inputItem,
      email: "yusufstudent2002@gmail.com",
    };
    createNewActivity(params)
      .then(() => {
        setReloadData(reloadData + 1);
        ToastMessage({ message: "Data has been added!" });
        setInputItem([]);
        setErrorFieldAdd(false);
      })
      .catch(() => {
        ToastMessage({ type: "error", message: "Field activity is required" });
        setErrorFieldAdd(true);
      });
  };

  const paginationClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Section>
        <div
          className="absolute w-[60vw] top-3/4 left-1/2"
          style={{ transform: "translate(-50%, -6.5%)" }}
        >
          <div className="w-full h-[60vh] bg-white rounded-lg shadow-md relative">
            <div className="h-auto flex items-center border-opacity-60 overflow-hidden">
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  ACTIVITY
                </h2>
              </div>

              <input
                data-cy="input-search"
                type="text"
                id="search"
                name="input-search"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search activity"
                className="mx-1 w-1/3 bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
              />

              <div className="w-full flex h-full justify-end items-center">
                <input
                  required
                  data-cy="form-input-add"
                  type="text"
                  value={inputItem}
                  name="input-todo"
                  onChange={(e) => setInputItem(e.target.value)}
                  placeholder="Enter your activity"
                  className={`border ${
                    erorrFieldAdd !== true
                      ? "border-gray-300"
                      : "border-red-500 "
                  } mr-2 w-1/3 bg-white rounded  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                />

                <button
                  data-cy="add-btn"
                  className="w-10 uppercase rounded-full text-white bg-blue-600 py-2 mr-1"
                  onClick={handleOnClick}
                >
                  <PlusIcon className="w-6 mx-auto" />
                </button>
              </div>
            </div>

            <div className="content w-full p-1">
              <section className="w-full overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                  <thead>
                    <tr className="">
                      <th className="bg-blue-600 px-4 py-3 title-font tracking-wider font-medium text-white text-sm ">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          disabled
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </th>
                      <th className="px-4 py-3 title-font tracking-wide font-medium text-white text-sm bg-blue-600">
                        <EyeIcon className="w-6 mx-auto" />
                      </th>
                      <th className="px-4 py-3 title-font tracking-wide font-medium text-white text-sm bg-blue-600">
                        Name
                      </th>
                      <th className="px-4 py-3 title-font tracking-wide font-medium text-white text-sm bg-blue-600">
                        Created At
                      </th>
                      <th className="px-4 py-3 text-center title-font tracking-wide font-medium text-white text-sm bg-blue-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.length > 0 ? (
                      currentData?.map((item, index: number) => {
                        return (
                          <tr key={index}>
                            <td className="px-4 py-3">
                              <CheckboxDone
                                id={item?.id}
                                checkedItems={checkedItems}
                                setCheckedItems={setCheckedItems}
                              />
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Tooltip content="Detail">
                                <EyeIcon
                                  className="w-6 mx-auto text-gray-500 cursor-pointer"
                                  onClick={() =>
                                    navigate(`/detail/${item?.id}`)
                                  }
                                />
                              </Tooltip>
                            </td>
                            <td
                              className={`${
                                checkedItems[item?.id]
                                  ? "text-gray-400 underlined"
                                  : `font-semibold`
                              } px-4 py-3 text-sm`}
                            >
                              {item.title}
                            </td>
                            <td
                              className={`${
                                checkedItems[item?.id]
                                  ? "text-gray-400 underlined"
                                  : `font-semibold`
                              } px-4 py-3 text-sm`}
                            >
                              {moment(item?.created_at).format("LLL")}
                            </td>
                            <td className="px-4 py-3 flex text-sm justify-center gap-2">
                              <Tooltip content="Edit">
                                <button
                                  data-cy="btn-edit"
                                  className="bg-gray-300 p-1 rounded-full"
                                  onClick={() => {
                                    setShowModal(true);
                                    setDetail(item);
                                  }}
                                >
                                  <PencilIcon className="w-5 text-orange-400" />
                                </button>
                              </Tooltip>

                              <Tooltip content="Delete">
                                <button
                                  data-cy="btn-delete"
                                  className="bg-gray-300 p-1 rounded-full"
                                  onClick={() => {
                                    setShowModalDel(true);
                                    setDetail(item);
                                  }}
                                >
                                  <TrashIcon className="w-5 text-deep-orange-600" />
                                </button>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="">
                          <div className="flex flex-col items-center justify-center">
                            {createElement("img", {
                              src: `${lostPage}`,
                              className: "w-1/3",
                            })}

                            <span className="text-sm font-semibold text-gray-400">
                              No Activity!
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            </div>

            <Pagination
              data={data}
              itemsPerPage={itemsPerPage}
              handleClick={paginationClick}
              currentPage={currentPage}
            />
          </div>
        </div>
      </Section>

      <Edit
        setShowModal={setShowModal}
        showModal={showModal}
        data={detail}
        reload={reloadData}
        setReload={setReloadData}
        setLoading={setLoading}
        loading={loading}
      />

      <Delete
        setReload={setReloadData}
        reload={reloadData}
        setShowModal={setShowModalDel}
        showModal={showModalDel}
        data={detail}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}

export default Todo;
