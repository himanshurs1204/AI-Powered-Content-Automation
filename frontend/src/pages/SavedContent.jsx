// src/pages/SavedContent.jsx
import { useState, useEffect } from 'react';
import { Button, Alert, Card } from '../components';
import { contentAPI } from '../services/api';
import { formatDateTime } from '../utils/helpers';

export const SavedContent = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [content, setContent] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedContent, setSelectedContent] = useState(null);

    useEffect(() => {
        fetchContent();
    }, [filter]);

    const fetchContent = async () => {
        setLoading(true);
        setError('');

        try {
            const { data } = await contentAPI.getAllContent(filter);
            setContent(data.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                await contentAPI.deleteContent(id);
                setContent(content.filter((c) => c._id !== id));
                setSelectedContent(null);
                alert('Content deleted successfully');
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete content');
            }
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(JSON.stringify(text, null, 2));
        alert('Copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">💾 Saved Content</h1>

                {error && (
                    <Alert
                        type="error"
                        message={error}
                        onClose={() => setError('')}
                    />
                )}

                {/* Filter */}
                <div className="mb-6 flex gap-2">
                    {['', 'title', 'script', 'thumbnail'].map((type) => (
                        <button
                            key={type || 'all'}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-lg transition ${filter === type
                                    ? 'bg-primary text-white'
                                    : 'bg-white border border-gray-300 hover:border-primary'
                                }`}
                        >
                            {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'All'}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Content List */}
                    <Card className="md:col-span-1 max-h-96 overflow-y-auto">
                        <h2 className="text-lg font-bold mb-4">
                            Items ({content.length})
                        </h2>

                        {loading && (
                            <p className="text-center text-gray-500 py-4">Loading...</p>
                        )}

                        {!loading && content.length === 0 && (
                            <p className="text-center text-gray-500 py-4">
                                No content saved yet
                            </p>
                        )}

                        <div className="space-y-2">
                            {content.map((item) => (
                                <button
                                    key={item._id}
                                    onClick={() => setSelectedContent(item)}
                                    className={`w-full text-left p-3 rounded-lg border-2 transition ${selectedContent?._id === item._id
                                            ? 'border-primary bg-primary bg-opacity-5'
                                            : 'border-gray-200 hover:border-primary'
                                        }`}
                                >
                                    <div className="font-semibold text-sm text-gray-800">
                                        {item.type.toUpperCase()}
                                    </div>
                                    <div className="text-xs text-gray-600 truncate">
                                        {item.prompt}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Content Details */}
                    <Card className="md:col-span-2">
                        {!selectedContent ? (
                            <p className="text-center text-gray-500 py-8">
                                Select an item to view details
                            </p>
                        ) : (
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {selectedContent.type.toUpperCase()}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {formatDateTime(selectedContent.createdAt)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(selectedContent._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>

                                <div className="mb-6 pb-6 border-b">
                                    <h3 className="font-bold text-gray-700 mb-2">Prompt:</h3>
                                    <p className="text-gray-600 text-sm">{selectedContent.prompt}</p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-bold text-gray-700">Generated Content:</h3>
                                        <button
                                            onClick={() => copyToClipboard(selectedContent.generatedContent)}
                                            className="text-sm text-primary hover:underline"
                                        >
                                            Copy
                                        </button>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                                        {Array.isArray(selectedContent.generatedContent) ? (
                                            <ul className="space-y-2">
                                                {selectedContent.generatedContent.map((item, idx) => (
                                                    <li key={idx} className="text-gray-700 text-sm">
                                                        {idx + 1}. {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : typeof selectedContent.generatedContent === 'string' ? (
                                            <p className="text-gray-700 whitespace-pre-wrap text-sm">
                                                {selectedContent.generatedContent}
                                            </p>
                                        ) : (
                                            <pre className="text-gray-700 text-xs overflow-x-auto">
                                                {JSON.stringify(selectedContent.generatedContent, null, 2)}
                                            </pre>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};
