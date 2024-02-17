import { FC } from "react";
import Swal from "sweetalert2";

type Props = {
  id: any;
  checkedItems: any;
  setCheckedItems: any;
};

const CheckboxDone: FC<Props> = ({ id, checkedItems, setCheckedItems }) => {
  // Handle Checked
  const handleCheckboxChange = (itemId: string) => {
    setCheckedItems((prevState: any) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));

    if (checkedItems[itemId] !== true) {
      Swal.fire({
        title: "Good job!",
        text: "Your Task is Done",
        icon: "success",
      });
    }
  };

  return (
    <>
      <input
        data-cy="checkbox-btn"
        type="checkbox"
        checked={checkedItems[id]}
        onChange={() => handleCheckboxChange(id)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
    </>
  );
};

export { CheckboxDone };
