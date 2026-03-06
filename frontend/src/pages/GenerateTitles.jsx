// src/pages/GenerateTitles.jsx
import { useState } from 'react';
import { Button, Input, Alert, Card } from '../components';
import { aiAPI } from '../services/api';
import { truncate } from '../utils/helpers';

export const GenerateTitles = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [titles, setTitles] = useState([]);
    const [form, setForm] = useState({
        topic: '',
        audience: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setTitles([]);

        if (!form.topic.trim()) {
            setError('Please enter a topic');
            return;
        }

        setLoading(true);

        try {
            const { data } = await aiAPI.generateBlogTitles(form.topic, form.audience);
            setTitles(data.data.titles || []);
            setSuccess('Blog titles generated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate titles');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">📝 Generate Blog Titles</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Input Section */}
                    <Card className="md:col-span-1">
                        <h2 className="text-xl font-bold mb-6">Generate Ideas</h2>

                        {error && (
                            <Alert
                                type="error"
                                message={error}
                                onClose={() => setError('')}
                            />
                        )}

                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Blog Topic"
                                placeholder="e.g., Machine Learning for Beginners"
                                name="topic"
                                value={form.topic}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Target Audience (Optional)"
                                placeholder="e.g., Beginners, Developers"
                                name="audience"
                                value={form.audience}
                                onChange={handleChange}
                            />

                            <Button
                                variant="primary"
                                className="w-full"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Generating...' : 'Generate Titles'}
                            </Button>
                        </form>
                    </Card>

                    {/* Results Section */}
                    <Card className="md:col-span-2">
                        <h2 className="text-xl font-bold mb-6">Generated Titles</h2>

                        {success && (
                            <Alert
                                type="success"
                                message={success}
                                onClose={() => setSuccess('')}
                            />
                        )}

                        {loading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-gray-500">Generating titles...</p>
                            </div>
                        )}

                        {!loading && titles.length === 0 && (
                            <p className="text-gray-500 text-center py-12">
                                Generate titles to see them here ✨
                            </p>
                        )}

                        {!loading && titles.length > 0 && (
                            <div className="space-y-3">
                                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                                    <p className="text-green-800 font-semibold">✅ {titles.length} titles generated!</p>
                                </div>
                                {titles.map((title, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all flex justify-between items-start gap-4 group"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">{index + 1}</span>
                                                <p className="font-semibold text-gray-800 text-base">{title}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(title)}
                                            className="px-3 py-1 bg-primary text-white rounded-md hover:bg-indigo-700 font-medium text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};
