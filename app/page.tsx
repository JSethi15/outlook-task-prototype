"use client"

import { useState } from "react"
import Ribbon from "@/components/Ribbon"
import Sidebar from "@/components/Sidebar"
import TaskList from "@/components/TaskList"
import TaskDetail from "@/components/TaskDetail"
import AddTaskModal from "@/components/AddTaskModal"

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

const initialTasks: Task[] = [
  {
    id: 1,
    title: "CID - 20206P1 Iteration One",
    startDate: "1/14/2026",
    dueDate: "1/27/2026",
    status: "Not Started",
    priority: "High",
    percentComplete: 0,
    owner: "Muhammad, Azad [C]",
    subTasks: [
      "Analyzing the CID Workflow",
      "Upgrade Serverless Services to Node 24",
      "[Dev] Perform testing of Unity Portal - All Modules",
    ],
  },
  {
    id: 2,
    title: "EDC - Features",
    startDate: "1/10/2026",
    dueDate: "1/20/2026",
    status: "In Progress",
    priority: "Medium",
    percentComplete: 45,
    owner: "John Doe",
    subTasks: [],
  },
  {
    id: 3,
    title: "Data Load Enhancements",
    startDate: "1/08/2026",
    dueDate: "11/19/2025",
    status: "Completed",
    priority: "Low",
    percentComplete: 100,
    owner: "Jane Smith",
    subTasks: [],
  },
]

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [selectedTask, setSelectedTask] = useState<Task | null>(initialTasks[0])
  const [activeSidebarItem, setActiveSidebarItem] = useState("Tasks")
  const [toastMessage, setToastMessage] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(""), 3000)
  }

  const handleDeleteTask = () => {
    if (selectedTask) {
      const updatedTasks = tasks.filter((t) => t.id !== selectedTask.id)
      setTasks(updatedTasks)
      setSelectedTask(updatedTasks.length > 0 ? updatedTasks[0] : null)
      showToast(`Task "${selectedTask.title}" deleted`)
    }
  }

  const handleMarkComplete = () => {
    if (selectedTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === selectedTask.id ? { ...t, status: "Completed", percentComplete: 100 } : t,
      )
      setTasks(updatedTasks)
      const updated = updatedTasks.find((t) => t.id === selectedTask.id)
      if (updated) setSelectedTask(updated)
      showToast(`Task marked as completed`)
    }
  }

  const handleUpdateTask = (updates: Partial<Task>) => {
    if (selectedTask) {
      const updatedTasks = tasks.map((t) => (t.id === selectedTask.id ? { ...t, ...updates } : t))
      setTasks(updatedTasks)
      const updated = updatedTasks.find((t) => t.id === selectedTask.id)
      if (updated) setSelectedTask(updated)
    }
  }

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const id = Math.max(...tasks.map((t) => t.id), 0) + 1
    const taskWithId: Task = { ...newTask, id }
    const updatedTasks = [...tasks, taskWithId]
    setTasks(updatedTasks)
    setSelectedTask(taskWithId)
    setShowAddModal(false)
    showToast(`Task "${newTask.title}" added`)
  }

  return (
    <div className="flex flex-col h-screen bg-[#1f1f1f] text-[#e6e6e6] font-sans">
      {/* Ribbon */}
      <Ribbon
        onRibbonAction={showToast}
        selectedTask={selectedTask}
        onDelete={handleDeleteTask}
        onMarkComplete={handleMarkComplete}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeSidebarItem={activeSidebarItem}
          onNavigate={(item) => {
            setActiveSidebarItem(item)
            showToast(`Navigated to ${item}`)
          }}
        />

        {/* Task List */}
        <TaskList tasks={tasks} onSelectTask={setSelectedTask} onAddTaskClick={() => setShowAddModal(true)} />

        {/* Task Detail */}
        <TaskDetail task={selectedTask} onTaskUpdate={showToast} onUpdateTask={handleUpdateTask} />
      </div>

      {/* Add Task Modal */}
      {showAddModal && <AddTaskModal onAdd={handleAddTask} onClose={() => setShowAddModal(false)} />}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0078d4] text-white px-4 py-2 rounded text-sm z-50">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
