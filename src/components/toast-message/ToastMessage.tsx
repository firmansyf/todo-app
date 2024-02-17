import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = (e: any) => {
  switch (e.type) {
    case "success":
      toast.success(e.message);
      break;
    case "error":
      toast.error(e.message);
      break;
    case "warn":
      toast.warn(e.message);
      break;
    case "info":
      toast.info(e.message);
      break;
    default:
      toast.success(e.message);
  }
};

export { ToastMessage };
