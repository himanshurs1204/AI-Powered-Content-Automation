// src/pages/GenerateThumbnail.jsx
import { useState } from 'react';
import { Button, Input, Select, Alert, Card } from '../components';
import { aiAPI } from '../services/api';

export const GenerateThumbnail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [form, setForm] = useState({
        videoTitle: '',
        style: 'tech',
    });

    const styleOptions = [
        { label: 'Tech', value: 'tech' },
        { label: 'Educational', value: 'educational' },
        { label: 'Motivational', value: 'motivational' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'News', value: 'news' },
    ];

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
        setThumbnail(null);

        if (!form.videoTitle.trim()) {
            setError('Please enter a video title');
            return;
        }

        setLoading(true);

        try {
            const { data } = await aiAPI.generateThumbnail(form.videoTitle, form.style);
            setThumbnail(data.data.thumbnail);
            setSuccess('Thumbnail idea generated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate thumbnail');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">🖼️ Generate Thumbnail Idea</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Input Section */}
                    <Card className="md:col-span-1">
                        <h2 className="text-xl font-bold mb-6">Thumbnail Details</h2>

                        {error && (
                            <Alert
                                type="error"
                                message={error}
                                onClose={() => setError('')}
                            />
                        )}

                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Video Title"
                                placeholder="e.g., 10 CSS Tips You Need to Know"
                                name="videoTitle"
                                value={form.videoTitle}
                                onChange={handleChange}
                                required
                            />

                            <Select
                                label="Content Style"
                                name="style"
                                value={form.style}
                                onChange={handleChange}
                                options={styleOptions}
                            />

                            <Button
                                variant="primary"
                                className="w-full"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Generating...' : 'Generate Thumbnail'}
                            </Button>
                        </form>
                    </Card>

                    {/* Results Section */}
                    <Card className="md:col-span-2">
                        <h2 className="text-xl font-bold mb-6">Thumbnail Suggestions</h2>

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
                                <p className="text-gray-500">Generating thumbnail idea...</p>
                            </div>
                        )}

                        {!loading && !thumbnail && (
                            <p className="text-gray-500 text-center py-12">
                                Generate a thumbnail idea to see suggestions here ✨
                            </p>
                        )}

                        {!loading && thumbnail && (
                            <div className="space-y-6">
                                <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                                    <p className="text-green-800 font-semibold">✅ Thumbnail idea generated!</p>
                                </div>

                                {thumbnail.mainText && (
                                    <div className="bg-gradient-to-r from-primary via-indigo-500 to-purple-500 text-white p-6 rounded-lg shadow-lg">
                                        <h3 className="font-bold mb-4 text-lg">📝 Main Text</h3>
                                        <p className="text-2xl font-bold tracking-wide">{thumbnail.mainText}</p>
                                        <p className="text-sm text-indigo-100 mt-3">This is the key text for your thumbnail</p>
                                    </div>
                                )}

                                {thumbnail.designElements && (
                                    <div className="border-l-4 border-primary pl-4 bg-indigo-50 p-4 rounded-r-lg">
                                        <h3 className="font-bold text-lg text-primary mb-3">🎨 Design Elements</h3>
                                        <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{thumbnail.designElements}</p>
                                    </div>
                                )}

                                {thumbnail.colorScheme && (
                                    <div className="border-l-4 border-pink-500 pl-4 bg-pink-50 p-4 rounded-r-lg">
                                        <h3 className="font-bold text-lg text-pink-900 mb-3">🌈 Color Scheme</h3>
                                        <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{thumbnail.colorScheme}</p>
                                    </div>
                                )}

                                {thumbnail.tips && (
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 pl-4 p-4 rounded-r-lg">
                                        <h3 className="font-bold text-lg text-yellow-900 mb-3">💡 Best Practices</h3>
                                        <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{thumbnail.tips}</p>
                                    </div>
                                )}

                                {thumbnail.full && (
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => copyToClipboard(thumbnail.full)}
                                            className="bg-primary text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold text-sm"
                                        >
                                            📋 Copy All Details
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(thumbnail.mainText)}
                                            className="bg-secondary text-white py-2 rounded-lg hover:opacity-90 transition font-semibold text-sm"
                                        >
                                            ✨ Copy Main Text
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};
