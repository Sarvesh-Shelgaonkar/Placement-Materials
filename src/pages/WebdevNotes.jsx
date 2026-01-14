import React from "react";

const resources = [
	// My Personal Notes
	{
		name: "📚 My Complete Notes Collection",
		url: "https://github.com/Sarvesh-Shelgaonkar/Placement-Materials/tree/main/WEBDEV/0)my_notes_nish",
		description: "Complete web dev notes - HTML, CSS, JS, React, Node.js, MongoDB, Docker, AWS & more"
	},
	
	// Full Stack Theory
	{
		name: "🎓 Full Stack Theory & Notes",
		url: "https://github.com/Sarvesh-Shelgaonkar/Placement-Materials/tree/main/WEBDEV/Full_Stack_%20%26%20Theory",
		description: "Full stack development concepts and theory"
	},
	
	// JavaScript
	{
		name: "💛 JavaScript Prep",
		url: "https://github.com/Sarvesh-Shelgaonkar/Placement-Materials/tree/main/WEBDEV/Javascript%20Prep",
		description: "JavaScript interview preparation and practice"
	},
	
	// Node.js
	{
		name: "🟢 Node.js Prep",
		url: "https://github.com/Sarvesh-Shelgaonkar/Placement-Materials/tree/main/WEBDEV/Node%20Js%20Prep",
		description: "Node.js backend development resources"
	},
	
	// React
	{
		name: "⚛️ React Prep",
		url: "https://github.com/Sarvesh-Shelgaonkar/Placement-Materials/tree/main/WEBDEV/React%20Prep",
		description: "React frontend development and interview prep"
	},
	
	// Roadmaps
	{
		name: "🗺️ Developer Roadmaps",
		url: "https://github.com/Sarvesh-Shelgaonkar/Placement-Materials/tree/main/WEBDEV/Roadmap",
		description: "Frontend, Backend, Full Stack & AI roadmaps"
	},
	
	// Git
	{
		name: "📖 Git Cheatsheets",
		url: "https://github.com/Sarvesh-Shelgaonkar/Placement-Materials/blob/main/WEBDEV/Git%20Cheatsheet.pdf",
		description: "Git commands and workflow reference"
	},
	
	// Original Backend Notes
	{
		name: "🔧 Node.js Backend Notes",
		url: "https://github.com/Sarvesh-Shelgaonkar/Placement-Materials/blob/main/WEBDEV/backend/node.js.md",
		description: "Backend development with Node.js"
	},
	{
		name: "🌐 REST API Notes",
		url: "https://github.com/Sarvesh-Shelgaonkar/Placement-Materials/blob/main/WEBDEV/backend/REST.md",
		description: "RESTful API design and implementation"
	},
];

const WebdevNotes = () => (
	<div className="max-w-4xl mx-auto px-4 py-10">
		<h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
			Web Development Learning
		</h1>
		<p className="mb-10 text-center text-base text-gray-600 dark:text-gray-300">
			Complete web development resources - Frontend, Backend, Full Stack, and more! All
			materials are curated from my personal learning journey.
		</p>
		<ul className="space-y-4 mb-10">
			{resources.map((res) => (
				<li
					key={res.name}
					className="border-b pb-4"
				>
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<span className="font-bold text-lg text-gray-900 dark:text-gray-100 block mb-1">
								{res.name}
							</span>
							{res.description && (
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{res.description}
								</p>
							)}
						</div>
						<a
							href={res.url}
							target="_blank"
							rel="noopener noreferrer"
							className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold whitespace-nowrap transition-colors"
						>
							View →
						</a>
					</div>
				</li>
			))}
		</ul>
		<p className="mt-12 text-center text-gray-400 text-xs">
			All resources are curated for university learning, practical skills, and
			deep understanding.
		</p>
		<p className="mt-16 text-center text-primary-500 text-base font-semibold">
			More web development resources coming soon. Stay curious and keep learning!
		</p>
		<p className="mt-2 text-center text-gray-500 text-sm">
			I'm also a learner—let's keep growing together!
		</p>
	</div>
);

export default WebdevNotes;
