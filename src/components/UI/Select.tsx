// import type { ComponentPropsWithoutRef } from 'react';

// // Setting up InputProps that contain the default <input> props as well as some custom props (label, id)
// type SelectProps = {
//   label: string;
//   id: string;
//   options: string[],
// } & ComponentPropsWithoutRef<'select'>;

// export default function Select({ label, id, options, ...props }: SelectProps) {
//   return (
//     <div className="selectNewTask">
//       <label htmlFor={id}>{label}</label>
//       <select id={id} {...props}>
//         {options.map(option =>
//           <option value={option}>
//             {option}
//           </option>
//         )}
//       </select>
//     </div>
//   );
// }

import { ChangeEvent/*, ComponentPropsWithoutRef*/ } from 'react';

// interface SelectOption {
//   value: string;
//   // label: string;
// }

interface SelectProps {
  options: string[];
  value: string;
  label: string;
  onChange: (value: string) => void;
}

export default function Select({ options, value, label, onChange }: SelectProps ) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="status" htmlFor={label}>{label}</label>
      <select className="selection" value={value} onChange={handleChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

