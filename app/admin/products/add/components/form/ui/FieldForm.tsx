// import React from "react";

// interface FieldFormProps {
//   type?: "text" | "number" | "textarea";
//   name: string;
//   placeholder: string;
//   register: any;
//   classNameStyleInput: string;
//   errors?: any;
//   label: string;
// }

// const FieldForm: React.FC<FieldFormProps> = ({
//   type = "text",
//   name,
//   placeholder,
//   register,
//   styleInput,
//   errors,
//   label,
// }) => {
//   return (
//     <div className="space-y-1">
//       <label
//         htmlFor={name}
//         className="block text-sm font-medium text-slate-700"
//       >
//         {label}
//       </label>

//       {type === "textarea" ? (
//         <textarea
//           id={name}
//           {...register(name)}
//           placeholder={placeholder}
//           className={`${styleInput} min-h-[100px] resize-vertical`}
//           rows={4}
//         />
//       ) : (
//         <input
//           type={type}
//           id={name}
//           {...register(name)}
//           placeholder={placeholder}
//           className={styleInput}
//         />
//       )}
//       {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
//     </div>
//   );
// };

// export default FieldForm;

import React from "react";

interface FieldFormProps {
  type?: "text" | "number" | "textarea" | "select";
  name: string;
  placeholder?: string;
  register: any;
  styleInput: string;
  errors?: any;
  label: string;
  options?: { value: string; label: string }[];
}

const FieldForm: React.FC<FieldFormProps> = ({
  type = "text",
  name,
  placeholder,
  register,
  styleInput,
  errors,
  label,
  options,
}) => {
  return (
    <div className="space-y-1 ">
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-100"
        >
          {label}
        </label>
      </div>
      <div>
        {type === "textarea" ? (
          <textarea
            id={name}
            {...register(name)}
            placeholder={placeholder}
            className={`${styleInput} min-h-[100px] resize-vertical`}
            rows={4}
            aria-invalid={errors ? "true" : "false"}
            aria-describedby={`${name}-error`}
          />
        ) : type === "select" ? (
          <select
            id={name}
            {...register(name)}
            className={styleInput}
            aria-invalid={errors ? "true" : "false"}
            aria-describedby={`${name}-error`}
          >
            <option value="">{placeholder || "Select an option"}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={name}
            {...register(name)}
            placeholder={placeholder}
            className={styleInput}
            aria-invalid={errors ? "true" : "false"}
            aria-describedby={`${name}-error`}
          />
        )}
      </div>
      {errors && (
        <p id={`${name}-error`} className="text-red-500 text-sm">
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default FieldForm;