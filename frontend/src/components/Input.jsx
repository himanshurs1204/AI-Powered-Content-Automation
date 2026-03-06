// src/components/Input.jsx
// Reusable input component
export const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = false,
    ...props
}) => (
    <div className="mb-4">
        {label && (
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${error ? 'border-red-500' : 'border-gray-300'
                }`}
            {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

// Textarea component
export const Textarea = ({
    label,
    placeholder,
    value,
    onChange,
    error,
    rows = 4,
    required = false,
    ...props
}) => (
    <div className="mb-4">
        {label && (
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${error ? 'border-red-500' : 'border-gray-300'
                }`}
            {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

// Select component
export const Select = ({
    label,
    options,
    value,
    onChange,
    error,
    required = false,
    ...props
}) => (
    <div className="mb-4">
        {label && (
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <select
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${error ? 'border-red-500' : 'border-gray-300'
                }`}
            {...props}
        >
            <option value="">Select an option</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);
