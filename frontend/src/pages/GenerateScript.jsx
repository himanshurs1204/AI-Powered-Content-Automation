// src/pages/GenerateScript.jsx
import { useState } from 'react';
import { Button, Input, Select, Alert, Card } from '../components';
import { aiAPI } from '../services/api';

export const GenerateScript = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [script, setScript] = useState(null);
    const [form, setForm] = useState({
        topic: '',
        videoLength: 'medium',
    });

    const videoLengthOptions = [
        { label: 'Short (2-3 min)', value: 'short' },
        { label: 'Medium (5-10 min)', value: 'medium' },
        { label: 'Long (15+ min)', value: 'long' },
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
        setScript(null);

        if (!form.topic.trim()) {
            setError('Please enter a video topic');
            return;
        }

        setLoading(true);

        try {
            const { data } = await aiAPI.generateYoutubeScript(form.topic, form.videoLength);
            setScript(data.data.script);
            setSuccess('YouTube script generated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate script');
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
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">🎬 Generate YouTube Script</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Input Section */}
                    <Card className="md:col-span-1">
                        <h2 className="text-xl font-bold mb-6">Script Details</h2>

                        {error && (
                            <Alert
                                type="error"
                                message={error}
                                onClose={() => setError('')}
                            />
                        )}

                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Video Topic"
                                placeholder="e.g., Web Development Tips"
                                name="topic"
                                value={form.topic}
                                onChange={handleChange}
                                required
                            />

                            <Select
                                label="Video Length"
                                name="videoLength"
                                value={form.videoLength}
                                onChange={handleChange}
                                options={videoLengthOptions}
                            />

                            <Button
                                variant="primary"
                                className="w-full"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Generating...' : 'Generate Script'}
                            </Button>
                        </form>
                    </Card>

                    {/* Results Section */}
                    <Card className="md:col-span-2">
                        <h2 className="text-xl font-bold mb-6">Generated Script</h2>

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
                                <p className="text-gray-500">Generating script...</p>
                            </div>
                        )}

                        {!loading && !script && (
                            <p className="text-gray-500 text-center py-12">
                                Generate a script to see it here ✨
                            </p>
                        )}

                        {!loading && script && (
                            <div className="space-y-6">
                                <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                                    <p className="text-green-800 font-semibold">✅ Script generated successfully!</p>
                                </div>

                                {script.intro && (
                                    <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg text-blue-900">🎬 Intro</h3>
                                            <button
                                                onClick={() => copyToClipboard(script.intro)}
                                                className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">{script.intro}</p>
                                    </div>
                                )}

                                {script.content && (
                                    <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg text-purple-900">📝 Main Content</h3>
                                            <button
                                                onClick={() => copyToClipboard(script.content)}
                                                className="px-2 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">{script.content}</p>
                                    </div>
                                )}

                                {script.conclusion && (
                                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg text-green-900">✨ Conclusion</h3>
                                            <button
                                                onClick={() => copyToClipboard(script.conclusion)}
                                                className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">{script.conclusion}</p>
                                    </div>
                                )}

                                {script.full && (
                                    <button
                                        onClick={() => copyToClipboard(script.full)}
                                        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                                    >
                                        📋 Copy Full Script
                                    </button>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};
