import { forwardRef } from "react";

interface ModalProps {
  onClick: () => Promise<void>;
}
export const Modal = forwardRef<HTMLUListElement, ModalProps>((props, ref) => {
  return (
    <>
      <ul
        ref={ref}
        className="appbar-dropdown absolute top-16 right-0 bg-white shadow-white shadow-md rounded-md divide-y  divide-gray-400 w-40 font-medium text-base text-center border"
      >
        <li
          className="py-3 cursor-pointer hover:bg-green-500 hover:text-white hover:rounded-t-md"
          // onClick={() => navigate(`/user/${currentUser?.id}`)}
        >
          Profile
        </li>
        <li
          className="py-3 cursor-pointer hover:bg-green-500 hover:text-white  hover:rounded-b-md"
          onClick={props.onClick}
        >
          <button>Sign Out</button>
        </li>
      </ul>
    </>
  );
});
