import { FC } from "react";

type Props = {
  data: any;
  itemsPerPage: number;
  handleClick: any;
  currentPage: number;
};

const Pagination: FC<Props> = ({
  data,
  itemsPerPage,
  handleClick,
  currentPage,
}) => {
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  return (
    <div className="absolute bottom-2 w-full">
      <div className="relative flex gap-2 justify-end px-3 p-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`${
              currentPage === index + 1 ? "bg-blue-600" : "bg-gray-300"
            } w-7 h-7 text-white rounded-full text-sm`}
            key={index}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
