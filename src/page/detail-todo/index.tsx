import { getDataTodoActivityById, getActivityById } from "@/api";
import { CheckboxDone } from "@/components/checkbox/Checkbox";
import { Section } from "@/components/layout/section";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import { Breadcrumbs, Tooltip } from "@material-tailwind/react";
import { FC, useState, useEffect, createElement } from "react";
import { useParams, Link } from "react-router-dom";
import lostPage from "@/assets/lost-page.png";
import { ModalAddEdit } from "@/page/detail-todo/modal-add-edit";
import { ModalDelete } from "@/page/detail-todo/modal-delete";
import Pagination from "@/components/pagination/Pagination";

const Detail: FC = () => {
  const { id }: any = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<any[]>([]);
  const [detailActivity, setDetailActivity] = useState<any>({});
  const [reloadData, setReloadData] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemDetail, setItemDetail] = useState<any>();
  const [showModalDel, setShowModalDel] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataDetail?.slice(startIndex, endIndex);

  const paginationClick = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getActivityById(id)
      .then(({ data }) => {
        setDetailActivity(data);
      })
      .catch(() => "");

    getDataTodoActivityById(id)
      .then(({ data: { data: res } }: any) => {
        setDataDetail(res);
      })
      .catch(() => "");
  }, [id, reloadData]);

  const priorityColor = (val: string) => {
    if (val === "high") return "text-red-100 bg-red-500 rounded-xl";
    if (val === "normal") return "text-yellow-100 bg-orange-500 rounded-xl";
    if (val === "low") return "text-purple-100 bg-purple-500 rounded-xl";
  };

  return (
    <>
      <Section>
        <div
          className="absolute w-[60vw] top-3/4 left-1/2"
          style={{ transform: "translate(-50%, -6.5%)" }}
        >
          <div className="w-full h-[60vh] bg-white rounded-lg shadow-md relative">
            <div className="h-auto flex items-center border-opacity-60 overflow-hidden gap-2 p-6">
              <Breadcrumbs className="flex-1">
                <Link to="/" className="opacity-60">
                  Activity
                </Link>
                <Link to="#" className="font-bold">
                  {detailActivity?.title}
                </Link>
              </Breadcrumbs>

              <div className="flex flex-1 h-full justify-end items-center">
                <button
                  className="w-10 uppercase rounded-full text-white bg-blue-600 py-2 mr-1"
                  onClick={() => {
                    setShowModal(true);
                    setItemDetail([]);
                  }}
                >
                  <PlusIcon className="w-6 mx-auto" />
                </button>
              </div>
            </div>

            <div className="content w-full p-1">
              <div>
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
                        Name
                      </th>
                      <th className="px-4 py-3 title-font tracking-wide font-medium text-white text-sm bg-blue-600">
                        Priority
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

                            <td
                              className={`${
                                checkedItems[item?.id]
                                  ? "text-gray-400"
                                  : `font-semibold`
                              } px-4 py-3 text-sm `}
                            >
                              {item.title}
                            </td>
                            <td>
                              <span
                                className={`${
                                  checkedItems[item?.id]
                                    ? "text-gray-400"
                                    : `${priorityColor(
                                        item.priority
                                      )} font-semibold`
                                } px-4 p-1 text-sm capitalize `}
                              >
                                {item?.priority === "normal"
                                  ? "medium"
                                  : item?.priority}
                              </span>
                            </td>
                            <td className="px-4 py-3 flex text-sm justify-center gap-2">
                              <Tooltip content="Edit">
                                <button
                                  className="bg-gray-300 p-1 rounded-full"
                                  onClick={() => {
                                    setShowModal(true);
                                    setItemDetail(item);
                                  }}
                                >
                                  <PencilIcon className="w-5 text-orange-400" />
                                </button>
                              </Tooltip>

                              <Tooltip content="Delete">
                                <button
                                  className="bg-gray-300 p-1 rounded-full"
                                  onClick={() => {
                                    setShowModalDel(true);
                                    setItemDetail(item);
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
              </div>
            </div>

            <Pagination
              data={dataDetail}
              itemsPerPage={itemsPerPage}
              handleClick={paginationClick}
              currentPage={currentPage}
            />
          </div>
        </div>
      </Section>

      <ModalAddEdit
        setShowModal={setShowModal}
        showModal={showModal}
        reload={reloadData}
        setReload={setReloadData}
        id={id}
        loading={loading}
        setLoading={setLoading}
        itemDetail={itemDetail}
        setItemDetail={setItemDetail}
      />

      <ModalDelete
        showModal={showModalDel}
        setShowModal={setShowModalDel}
        itemDetail={itemDetail}
        setReload={setReloadData}
        reload={reloadData}
        setLoading={setLoading}
        loading={loading}
        setItemDetail={setItemDetail}
      />
    </>
  );
};

export { Detail };
