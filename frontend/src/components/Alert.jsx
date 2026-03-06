// src/components/Alert.jsx
// Alert component for notifications
export const Alert = ({ type = 'info', message, onClose }) => {
    const types = {
        success: 'bg-green-100 text-green-800 border-green-300',
        error: 'bg-red-100 text-red-800 border-red-300',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        info: 'bg-blue-100 text-blue-800 border-blue-300',
    };

    return (
        <div
            className={`border-l-4 p-4 rounded-md mb-4 flex justify-between items-center ${types[type]}`}
            role="alert"
        >
            <span>{message}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    className="text-xl font-bold cursor-pointer hover:opacity-70"
                >
                    ×
                </button>
            )}
        </div>
    );
};

// Multiple alerts container
export const AlertContainer = ({ alerts, removeAlert }) => (
    <div className="fixed top-4 right-4 w-full max-w-md z-50 space-y-2">
        {alerts.map((alert) => (
            <Alert
                key={alert.id}
                type={alert.type}
                message={alert.message}
                onClose={() => removeAlert(alert.id)}
            />
        ))}
    </div>
);
