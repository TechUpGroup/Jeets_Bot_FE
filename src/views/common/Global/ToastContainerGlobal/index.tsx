import 'react-toastify/dist/ReactToastify.css';

import { Slide, ToastContainer } from 'react-toastify';

import { CloseToastIcon } from '@/components/Icons';
import styled from '@emotion/styled';

const ToastContainerStyled = styled(ToastContainer)`
  .Toastify__progress-bar--wrp {
    height: 0;
  }

  .Toastify__toast-icon {
    width: 1rem;
    margin-top: 2px;
    margin-right: 0.5rem;
  }

  .Toastify__toast {
    min-height: fit-content;
    border-radius: 0;
    padding: 0;
    .Toastify__toast-body {
      padding: 0;
      margin: 0;
      align-items: start;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .Toastify__close-button {
    color: #e2e8ff;
    opacity: 1;
  }

  .Toastify__toast--info {
    color: white;
    background: rgba(0, 52, 154, 1);
    padding: 12px;
  }

  .Toastify__toast--error {
    color: white;
    background: red;
  }

  .Toastify__toast--success {
    color: white;
    background: green;
  }
`;

export default function ToastContainerGlobal() {
  return (
    <>
      <ToastContainerStyled
        transition={Slide}
        position="top-center"
        stacked
        hideProgressBar
        containerId="toastError"
        closeButton={({ closeToast }) => (
          <button type="button" onClick={closeToast} className="absolute right-2.5 top-2.5">
            <CloseToastIcon />
          </button>
        )}
        icon={false}
      />
      <ToastContainerStyled
        transition={Slide}
        position="top-center"
        stacked
        containerId="toastInfo"
        hideProgressBar
        closeButton={({ closeToast }) => (
          <button type="button" onClick={closeToast} className="absolute right-2.5 top-2.5">
            <CloseToastIcon />
          </button>
        )}
        icon={false}
      />
    </>
  );
}
