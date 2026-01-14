"use client"

import { useState } from "react"
import { CheckSquare, Square } from "lucide-react"

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

export default function TaskItem({
  task,
  isSelected,
  onClick,
}: {
  task: Task
  isSelected: boolean
  onClick: () => void
}) {
  const [isCompleted, setIsCompleted] = useState(false)

  return (
    <div
      onClick={onClick}
      className={`h-9 flex items-center px-4 gap-3 border-b border-[#2d2d30] cursor-pointer transition-colors ${
        isSelected ? "bg-[#2d2d30] text-[#e6e6e6]" : "hover:bg-[#252526] text-[#e6e6e6]"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsCompleted(!isCompleted)
        }}
        className="w-6 flex items-center justify-center hover:bg-[#3e3e42] rounded transition-colors"
      >
        {isCompleted ? (
          <CheckSquare size={16} className="text-[#0078d4]" />
        ) : (
          <Square size={16} className="text-[#999999]" />
        )}
      </button>

      {/* Title */}
      <div className="flex-1 text-[12px] truncate">{task.title}</div>

      {/* Due Date */}
<div className="w-32 text-[12px] text-[#999999] px-2">{task.dueDate}</div>
      {/* Categories */}
      <div className="w-24 text-[12px] text-[#999999]">-</div>
    </div>
  )
}
