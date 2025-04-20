export function ProjectHeader({ project }) {
  return (
    <div className="border-b border-[#1E1E2A] bg-[#0A0A0F]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#1E1E2A] flex items-center justify-center text-blue-500 text-lg font-medium">
            {project.icon}
          </div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-semibold text-white">
              <span className="text-gray-400">{project.owner} /</span> {project.repo}
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1E1E2A] text-gray-400">Private</span>
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm max-w-2xl">{project.description}</p>
        </div>
      </div>
    </div>
  )
}
