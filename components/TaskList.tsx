"use client"

import { useState } from "react"
import TaskItem from "./TaskItem"
import { Search, Plus } from "lucide-react"

interface Task {
  id: number
  title: string
  startDate: string
  dueDate: string
  status: string
  priority: string
  percentComplete: number
  owner: string
  subTasks: string[]
}

export default function TaskList({
  tasks,
  onSelectTask,
  onAddTaskClick,
}: {
  tasks: Task[]
  onSelectTask: (task: Task) => void
  onAddTaskClick?: () => void
}) {
  const [selectedId, setSelectedId] = useState<number | null>(1)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectTask = (task: Task) => {
    setSelectedId(task.id)
    onSelectTask(task)
  }

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddTask = () => {
    if (onAddTaskClick) {
      onAddTaskClick()
    }
  }

  return (
    <div className="flex-1 bg-[#1e1e1e] border-r border-[#333333] flex flex-col min-w-0">
      {/* Toolbar */}
      <div className="h-12 bg-[#2d2d30] border-b border-[#333333] flex items-center px-4 gap-4">
        <div className="flex-1 flex items-center gap-2 bg-[#3e3e42] rounded px-2 py-1">
          <Search size={14} className="text-[#999999]" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-[12px] text-[#e6e6e6] placeholder-[#999999] outline-none"
          />
        </div>
        <button
          onClick={handleAddTask}
          className="hover:bg-[#3e3e42] p-1 rounded transition-colors active:bg-[#555555]"
          title="Add new task"
        >
          <Plus size={16} className="text-[#e6e6e6]" />
        </button>
      </div>

      {/* Column Headers */}
      <div className="h-10 bg-[#252526] border-b border-[#333333] flex items-center px-4 text-[11px] font-medium text-[#999999]">
        <div className="w-6 flex items-center justify-center"></div>
        <div className="flex-1 px-2">Subject</div>
        <div className="w-32 px-2">Due Date</div>
        <div className="w-24 px-2">Categories</div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedId === task.id}
              onClick={() => handleSelectTask(task)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-[#999999] text-sm">No tasks found</div>
        )}
      </div>
    </div>
  )
}
