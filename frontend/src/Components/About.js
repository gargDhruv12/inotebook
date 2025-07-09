import React from 'react'

const About = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="max-w-2xl w-full bg-white dark:bg-card rounded-lg shadow-lg p-8 mx-2">
                <h1 className="text-3xl font-bold mb-4 text-center">About iNotebook</h1>
                <p className="text-lg text-muted-foreground mb-6 text-center">
                    <span className="font-semibold text-primary">iNotebook</span> is your modern, organized, and beautiful note-taking app. Effortlessly manage your notes, tasks, and study materials with categories, search, and a clean interface.
                </p>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Key Features</h2>
                    <ul className="list-disc pl-6 space-y-1 text-base">
                        <li>🗂️ Organize notes by <span className="font-medium">categories</span> (e.g., Physics, Chemistry, Daily Tasks)</li>
                        <li>🔍 <span className="font-medium">Search</span> and filter notes instantly</li>
                        <li>📝 <span className="font-medium">Create, edit, and delete</span> notes with ease</li>
                        <li>🎨 <span className="font-medium">Modern UI</span> with responsive design and dark mode</li>
                        <li>🔒 <span className="font-medium">Secure</span> login and signup</li>
                    </ul>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">How to Use</h2>
                    <ol className="list-decimal pl-6 space-y-1 text-base">
                        <li>Sign up or log in to your account</li>
                        <li>Create categories for your notes (e.g., <span className="font-medium">Physics</span>, <span className="font-medium">Daily Tasks</span>)</li>
                        <li>Add notes and assign them to categories</li>
                        <li>Search, filter, and manage your notes easily</li>
                    </ol>
                </div>
                <div className="text-center text-muted-foreground text-sm">
                    Made with <span className="text-red-500">♥</span> by Dhruv Garg
                </div>
            </div>
        </div>
    )
}

export default About
