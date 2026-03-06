// src/components/Card.jsx
// Reusable card component
export const Card = ({ className = '', children }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition ${className}`}>
        {children}
    </div>
);

// Loading card skeleton
export const CardSkeleton = ({ count = 3 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-40 animate-pulse"></div>
        ))}
    </div>
);
