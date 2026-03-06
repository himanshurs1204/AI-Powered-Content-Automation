// src/components/Button.jsx
// Reusable button component
export const Button = ({
    children,
    onClick,
    className = '',
    disabled = false,
    variant = 'primary',
    ...props
}) => {
    const baseClass = 'px-4 py-2 rounded-lg font-medium transition duration-200';

    const variants = {
        primary: 'bg-primary text-white hover:bg-indigo-700 disabled:bg-gray-400',
        secondary: 'bg-secondary text-white hover:bg-pink-600 disabled:bg-gray-400',
        outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    return (
        <button
            className={`${baseClass} ${variants[variant]} ${className} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
