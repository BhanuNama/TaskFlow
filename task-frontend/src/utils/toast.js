import { toast, Zoom } from 'react-toastify';

const defaultConfig = {
  position: "top-center",
  autoClose: 1200,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  transition: Zoom,
};

export const showSuccess = (message) => {
  toast.success(message, defaultConfig);
};

export const showError = (message) => {
  toast.error(message, defaultConfig);
};

export const showInfo = (message) => {
  toast.info(message, defaultConfig);
};

