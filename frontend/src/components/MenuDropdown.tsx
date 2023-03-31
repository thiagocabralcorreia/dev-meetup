import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import Tooltip from "./Tooltip";

interface MenuDropdownProps {
  deleteHandler?: () => void;
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ deleteHandler }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="my-auto">
          <Tooltip
            text="Edit or delete this event"
            customStyle="top-5 right-0 w-[165px]"
          >
            <FiMoreHorizontal
              className="ml-2 -mr-1 h-5 w-5 transition duration-150 ease-out hover:ease-in text-gray-500 hover:text-primary"
              aria-hidden="true"
            />
          </Tooltip>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-2 w-56 origin-top-right
        divide-y divide-gray-100 rounded-md bg-white shadow-lg
        ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-primary text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <EditActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <EditInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={deleteHandler}
                  className={`${
                    active ? "bg-primary text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <DeleteActiveIcon
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <DeleteInactiveIcon
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                  )}
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

function EditInactiveIcon(props: IconProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#ffc2df"
        stroke="#E82E81"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props: IconProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#ef4b95"
        stroke="#fbbad8"
        strokeWidth="2"
      />
    </svg>
  );
}

function DeleteInactiveIcon(props: IconProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#ffc2df"
        stroke="#E82E81"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#E82E81" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#E82E81" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props: IconProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#ef4b95"
        stroke="#fbbad8"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#fbbad8" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#fbbad8" strokeWidth="2" />
    </svg>
  );
}

export default MenuDropdown;
