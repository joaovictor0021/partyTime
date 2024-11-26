import { toast } from "react-toastify"

const useToast = (msg, status = null) => {
  if(!status) {
    toast.success(msg, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  } else if (status === "error") {
    toast.error(msg, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  }
}

export default useToast;