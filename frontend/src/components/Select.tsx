import { motion } from "framer-motion";
import { Fragment } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { Listbox, Transition } from "@headlessui/react";

interface CategorySchema {
  value: string;
  name: string;
}

interface SelectProps {
  onChange?: (query: CategorySchema) => void;
  selected: CategorySchema;
  categories: CategorySchema[];
  className: string;
  left?: string;
}

const Select: React.FC<SelectProps> = ({
  onChange,
  selected,
  categories,
  className,
  left = "left-0",
}) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative z-50">
        <Listbox.Button className={className}>
          <span className="content-center my-auto">{selected.name}</span>
          <HiChevronUpDown
            className="h-7 w-6 text-gray-800"
            aria-hidden="true"
          />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100 hidden"
          leaveFrom="opacity-100 relative"
          leaveTo="hidden relative"
        >
          <Listbox.Options
            className={`absolute max-h-64 w-full overflow-auto rounded-3xl bg-white py-1 text-base
            shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${left}`}
          >
            {categories.map(
              (category) =>
                category !== categories[0] && (
                  <Listbox.Option
                    key={category.name}
                    className={({ active }) =>
                      `cursor-default select-none py-2 pl-10 pr-4  ${
                        active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={category}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate text-sm ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {category.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900"></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                )
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
