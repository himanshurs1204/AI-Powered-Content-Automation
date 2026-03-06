// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';
import { Card } from '../components';

export const Dashboard = () => {
    const tools = [
        {
            id: 1,
            title: 'Generate Blog Titles',
            description: 'AI-powered blog title ideas for your next article',
            icon: '📝',
            link: '/generate-titles',
            color: 'from-blue-400 to-blue-600',
        },
        {
            id: 2,
            title: 'Generate YouTube Script',
            description: 'Create engaging video scripts with AI assistance',
            icon: '🎬',
            link: '/generate-script',
            color: 'from-red-400 to-red-600',
        },
        {
            id: 3,
            title: 'Generate Thumbnail',
            description: 'Get thumbnail ideas and design suggestions',
            icon: '🖼️',
            link: '/generate-thumbnail',
            color: 'from-purple-400 to-purple-600',
        },
        {
            id: 4,
            title: 'Content Calendar',
            description: 'Plan and organize your content schedule',
            icon: '📅',
            link: '/content-calendar',
            color: 'from-green-400 to-green-600',
        },
        {
            id: 5,
            title: 'Saved Content',
            description: 'View all your previously generated content',
            icon: '💾',
            link: '/saved-content',
            color: 'from-yellow-400 to-yellow-600',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to Content AI 🚀
                    </h1>
                    <p className="text-xl text-gray-600">
                        Create amazing content with AI assistance. Choose a tool to get started!
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {tools.map((tool) => (
                        <Link key={tool.id} to={tool.link}>
                            <Card className="h-full cursor-pointer hover:scale-105 transform transition">
                                <div className={`bg-gradient-to-br ${tool.color} rounded-lg p-4 mb-4`}>
                                    <span className="text-3xl">{tool.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.title}</h3>
                                <p className="text-gray-600 text-sm">{tool.description}</p>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Info Section */}
                <Card className="bg-gradient-to-r from-primary to-secondary text-white">
                    <h3 className="text-xl font-bold mb-3">💡 How to Use?</h3>
                    <ul className="space-y-2 text-sm">
                        <li>✅ Select any tool from above</li>
                        <li>✅ Fill in the required information</li>
                        <li>✅ Wait for AI to generate your content</li>
                        <li>✅ Save and reuse your generated content</li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};
