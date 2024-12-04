import { FC } from 'react';
import * as Select from '@radix-ui/react-select';

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * Reusable dropdown component using Radix UI Select
 * Used for Department, Project, and other selection fields
 */
const Dropdown: FC<DropdownProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="inline-flex items-center justify-between rounded px-4 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 min-w-[200px]">
          <Select.Value placeholder={`Select ${label}`} />
          <Select.Icon className="ml-2">▼</Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
                >
                  <Select.ItemText>{option}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default Dropdown;
