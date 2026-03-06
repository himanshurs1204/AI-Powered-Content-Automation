// src/pages/ContentCalendar.jsx
import { useState, useEffect } from 'react';
import { Button, Input, Select, Textarea, Alert, Card } from '../components';
import { calendarAPI } from '../services/api';
import { formatDate, getStatusColor, getPlatformIcon } from '../utils/helpers';

export const ContentCalendar = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [entries, setEntries] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        title: '',
        platform: 'Blog',
        date: '',
        status: 'Planned',
        description: '',
    });

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        setLoading(true);
        setError('');

        try {
            const { data } = await calendarAPI.getEntries();
            // Sort by date
            const sorted = (data.data || []).sort((a, b) => new Date(a.date) - new Date(b.date));
            setEntries(sorted);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load calendar');
        } finally {
            setLoading(false);
        }
    };

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

        if (!form.title || !form.date) {
            setError('Please fill all required fields');
            return;
        }

        try {
            if (editingId) {
                await calendarAPI.updateEntry(editingId, form);
                setSuccess('Entry updated successfully');
            } else {
                await calendarAPI.createEntry(form);
                setSuccess('Entry created successfully');
            }

            // Reset form
            setForm({
                title: '',
                platform: 'Blog',
                date: '',
                status: 'Planned',
                description: '',
            });
            setShowForm(false);
            setEditingId(null);

            // Refresh list
            await fetchEntries();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save entry');
        }
    };

    const handleEdit = (entry) => {
        setForm({
            title: entry.title,
            platform: entry.platform,
            date: entry.date.split('T')[0],
            status: entry.status,
            description: entry.description || '',
        });
        setEditingId(entry._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await calendarAPI.deleteEntry(id);
                await fetchEntries();
                setSuccess('Entry deleted successfully');
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete entry');
            }
        }
    };

    const platformOptions = [
        { label: 'Blog', value: 'Blog' },
        { label: 'YouTube', value: 'YouTube' },
        { label: 'Instagram', value: 'Instagram' },
    ];

    const statusOptions = [
        { label: 'Planned', value: 'Planned' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Published', value: 'Published' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">📅 Content Calendar</h1>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingId(null);
                            setForm({
                                title: '',
                                platform: 'Blog',
                                date: '',
                                status: 'Planned',
                                description: '',
                            });
                        }}
                    >
                        {showForm ? 'Close' : '+ Add Entry'}
                    </Button>
                </div>

                {error && (
                    <Alert
                        type="error"
                        message={error}
                        onClose={() => setError('')}
                    />
                )}

                {success && (
                    <Alert
                        type="success"
                        message={success}
                        onClose={() => setSuccess('')}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Form */}
                    {showForm && (
                        <Card className="md:col-span-1">
                            <h2 className="text-lg font-bold mb-4">
                                {editingId ? 'Edit Entry' : 'New Entry'}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <Input
                                    label="Title"
                                    placeholder="e.g., React Tutorial"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />

                                <Select
                                    label="Platform"
                                    name="platform"
                                    value={form.platform}
                                    onChange={handleChange}
                                    options={platformOptions}
                                />

                                <Input
                                    label="Date"
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                />

                                <Select
                                    label="Status"
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    options={statusOptions}
                                />

                                <Textarea
                                    label="Description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={3}
                                />

                                <Button
                                    variant="primary"
                                    className="w-full mb-2"
                                    onClick={handleSubmit}
                                >
                                    {editingId ? 'Update' : 'Create'}
                                </Button>

                                {editingId && (
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingId(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </form>
                        </Card>
                    )}

                    {/* Calendar View */}
                    <Card className={showForm ? 'md:col-span-2' : 'md:col-span-3'}>
                        <h2 className="text-lg font-bold mb-4">
                            Planned Content ({entries.length})
                        </h2>

                        {loading && <p className="text-center py-8">Loading...</p>}

                        {!loading && entries.length === 0 && (
                            <p className="text-center text-gray-500 py-8">No entries yet</p>
                        )}

                        <div className="space-y-3">
                            {entries.map((entry) => (
                                <div
                                    key={entry._id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl">{getPlatformIcon(entry.platform)}</span>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{entry.title}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {formatDate(entry.date)}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(entry.status)}`}>
                                            {entry.status}
                                        </span>
                                    </div>

                                    {entry.description && (
                                        <p className="text-sm text-gray-600 mb-3">{entry.description}</p>
                                    )}

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(entry)}
                                            className="text-sm text-primary hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(entry._id)}
                                            className="text-sm text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
