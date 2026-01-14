"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Calendar, AlertCircle, User, PercentSquare } from "lucide-react"

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

interface TaskDetailProps {
  task: Task | null
  onTaskUpdate: (message: string) => void
  onUpdateTask?: (updates: Partial<Task>) => void
}

export default function TaskDetail({ task, onTaskUpdate, onUpdateTask }: TaskDetailProps) {
  const [percentComplete, setPercentComplete] = useState(task?.percentComplete || 0)
  const [status, setStatus] = useState(task?.status || "Not Started")
  const [priority, setPriority] = useState(task?.priority || "Medium")

  useEffect(() => {
    if (task) {
      setPercentComplete(task.percentComplete)
      setStatus(task.status)
      setPriority(task.priority)
    }
  }, [task])

  const handlePercentChange = (value: number) => {
    setPercentComplete(value)
    if (onUpdateTask) {
      onUpdateTask({ percentComplete: value })
    }
    onTaskUpdate(`Progress updated to ${value}%`)
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    if (onUpdateTask) {
      onUpdateTask({ status: newStatus })
    }
    onTaskUpdate(`Status changed to ${newStatus}`)
  }

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority)
    if (onUpdateTask) {
      onUpdateTask({ priority: newPriority })
    }
    onTaskUpdate(`Priority changed to ${newPriority}`)
  }

  if (!task) {
    return (
      <div className="w-96 bg-[#252526] border-l border-[#333333] flex items-center justify-center">
        <p className="text-[#999999] text-sm">Select a task to view details</p>
      </div>
    )
  }

  return (
    <div className="w-96 bg-[#252526] border-l border-[#333333] flex flex-col overflow-hidden">
      {/* Details Panel */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Title */}
          <h2 className="text-base font-semibold text-[#e6e6e6] mb-6 break-words">{task.title}</h2>

          {/* Info Section */}
          <div className="space-y-4">
            {/* Start Date */}
            <DetailField icon={<Calendar size={16} />} label="Start date" value={task.startDate} disabled={true} />

            {/* Due Date */}
            <DetailField icon={<Calendar size={16} />} label="Due date" value={task.dueDate} disabled={true} />

            {/* Status */}
            <div className="flex items-center gap-3">
              <div className="text-[#999999] flex-shrink-0">
                <AlertCircle size={16} />
              </div>
              <div className="flex-1">
                <div className="text-[11px] text-[#999999] mb-1">Status</div>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555] cursor-pointer hover:border-[#0078d4] transition-colors"
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>
            </div>

            {/* Priority */}
            <div className="flex items-center gap-3">
              <div className="text-[#999999] flex-shrink-0">
                <AlertCircle size={16} />
              </div>
              <div className="flex-1">
                <div className="text-[11px] text-[#999999] mb-1">Priority</div>
                <select
                  value={priority}
                  onChange={(e) => handlePriorityChange(e.target.value)}
                  className="w-full px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555] cursor-pointer hover:border-[#0078d4] transition-colors"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            {/* Percent Complete */}
            <div className="flex items-center gap-3">
              <PercentSquare size={16} className="text-[#999999] flex-shrink-0" />
              <div className="flex-1">
                <div className="text-[11px] text-[#999999] mb-1">% Complete</div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={`${percentComplete}%`}
                    className="flex-1 px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555]"
                    disabled
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={percentComplete}
                    onChange={(e) => handlePercentChange(Number(e.target.value))}
                    className="w-16 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Owner */}
            <DetailField icon={<User size={16} />} label="Owner" value={task.owner} disabled={true} />
          </div>

          {/* Subtasks Section */}
          {task.subTasks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-[12px] font-semibold text-[#e6e6e6] mb-3">Subtasks</h3>
              <ol className="space-y-2 text-[12px]">
                {task.subTasks.map((subTask, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => onTaskUpdate(`Clicked on: ${subTask}`)}
                  >
                    <span className="text-[#999999] flex-shrink-0">{idx + 1}.</span>
                    <span className="text-[#0078d4] hover:underline">{subTask}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailField({
  icon,
  label,
  value,
  disabled = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  disabled?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[#999999] flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="text-[11px] text-[#999999] mb-1">{label}</div>
        <input
          type="text"
          value={value}
          className="w-full px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555]"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
