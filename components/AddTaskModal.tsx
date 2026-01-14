"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface Task {
  title: string
  startDate: string
  dueDate: string
  status: string
  priority: string
  percentComplete: number
  owner: string
  subTasks: string[]
}

export default function AddTaskModal({
  onAdd,
  onClose,
}: {
  onAdd: (task: Omit<Task, "id">) => void
  onClose: () => void
}) {
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState("Not Started")
  const [priority, setPriority] = useState("Medium")
  const [owner, setOwner] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert("Please enter a task title")
      return
    }

    onAdd({
      title,
      startDate,
      dueDate,
      status,
      priority,
      percentComplete: 0,
      owner,
      subTasks: [],
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-[#252526] border border-[#333333] rounded-lg shadow-lg w-96">
          {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#333333]">
          <h2 className="text-base font-semibold text-[#e6e6e6]">Add New Task</h2>
          <button onClick={onClose} className="text-[#999999] hover:text-[#e6e6e6] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[11px] text-[#999999] mb-1">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555] focus:border-[#0078d4] outline-none transition-colors"
              placeholder="Enter task title"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-[11px] text-[#999999] mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555] focus:border-[#0078d4] outline-none transition-colors"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-[11px] text-[#999999] mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555] focus:border-[#0078d4] outline-none transition-colors"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-[11px] text-[#999999] mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555] cursor-pointer hover:border-[#0078d4] transition-colors"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-[11px] text-[#999999] mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555] cursor-pointer hover:border-[#0078d4] transition-colors"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Owner */}
          <div>
            <label className="block text-[11px] text-[#999999] mb-1">Owner</label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full px-2 py-1 bg-[#3e3e42] text-[12px] text-[#e6e6e6] rounded border border-[#555555] focus:border-[#0078d4] outline-none transition-colors"
              placeholder="Enter owner name"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4 border-t border-[#333333]">
            <button
              type="submit"
              className="flex-1 px-3 py-2 bg-[#0078d4] text-white text-[12px] font-medium rounded hover:bg-[#106ebe] transition-colors"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-2 bg-[#3e3e42] text-[#e6e6e6] text-[12px] font-medium rounded hover:bg-[#555555] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
