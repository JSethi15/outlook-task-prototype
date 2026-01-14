"use client"

import type React from "react"
import { Save, Trash2, Forward, CheckCircle2, Tag, Flag, AlertCircle, Lock, ZoomIn, Moon } from "lucide-react"

interface RibbonProps {
  onRibbonAction: (message: string) => void
  selectedTask: any
  onDelete?: () => void
  onMarkComplete?: () => void
}

export default function Ribbon({ onRibbonAction, selectedTask, onDelete, onMarkComplete }: RibbonProps) {
  const handleSaveClose = () => {
    onRibbonAction(selectedTask ? `Task "${selectedTask.title}" saved and closed` : "No task selected")
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
    } else {
      onRibbonAction(selectedTask ? `Task "${selectedTask.title}" deleted` : "No task selected")
    }
  }

  const handleForward = () => {
    onRibbonAction(selectedTask ? `Task "${selectedTask.title}" forwarded` : "No task selected")
  }

  const handleMarkComplete = () => {
    if (onMarkComplete) {
      onMarkComplete()
    } else {
      onRibbonAction(selectedTask ? `Task "${selectedTask.title}" marked complete` : "No task selected")
    }
  }

  const handleCategorize = () => {
    onRibbonAction(selectedTask ? "Open categorize dialog" : "No task selected")
  }

  const handleFollowUp = () => {
    onRibbonAction(selectedTask ? "Flagged for follow up" : "No task selected")
  }

  const handleHighImportance = () => {
    onRibbonAction(selectedTask ? "Tagged as High Importance" : "No task selected")
  }

  const handlePrivate = () => {
    onRibbonAction(selectedTask ? "Marked as Private" : "No task selected")
  }

  const handleZoom = () => {
    onRibbonAction("Zoom dialog opened")
  }

  const handleDarkMode = () => {
    onRibbonAction("Dark mode toggled")
  }

  return (
    <div className="h-24 bg-[#2d2d30] border-b border-[#3a3a3a] flex items-start px-2 py-1 gap-6 overflow-x-auto">
      {/* File Menu */}
      <div className="flex items-start gap-2">
        <button
          onClick={() => onRibbonAction("File menu opened")}
          className="text-[11px] font-medium text-[#e6e6e6] hover:bg-[#3e3e42] px-2 py-1 rounded transition-colors"
        >
          File
        </button>
      </div>

      {/* Actions Group */}
      <RibbonGroup title="Actions">
        <RibbonButton icon={<Save size={16} />} label="Save & Close" onClick={handleSaveClose} />
        <RibbonButton icon={<Trash2 size={16} />} label="Delete" onClick={handleDelete} />
        <RibbonButton icon={<Forward size={16} />} label="Forward" onClick={handleForward} />
      </RibbonGroup>

      {/* Task Group */}
      <RibbonGroup title="Task">
        <RibbonButton icon={<CheckCircle2 size={16} />} label="Mark Complete" onClick={handleMarkComplete} />
        <RibbonButton icon={<Tag size={16} />} label="Categorize" onClick={handleCategorize} />
        <RibbonButton icon={<Flag size={16} />} label="Follow Up" onClick={handleFollowUp} />
      </RibbonGroup>

      {/* Tags Group */}
      <RibbonGroup title="Tags">
        <RibbonButton icon={<AlertCircle size={16} />} label="High Importance" onClick={handleHighImportance} />
        <RibbonButton icon={<Lock size={16} />} label="Private" onClick={handlePrivate} />
      </RibbonGroup>

      {/* View Group */}
      <RibbonGroup title="View">
        <RibbonButton icon={<ZoomIn size={16} />} label="Zoom" onClick={handleZoom} />
        <RibbonButton icon={<Moon size={16} />} label="Dark Mode" onClick={handleDarkMode} />
      </RibbonGroup>
    </div>
  )
}

function RibbonGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-1">{children}</div>
      <div className="text-[10px] text-[#999999] whitespace-nowrap">{title}</div>
    </div>
  )
}

function RibbonButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 px-2 py-1 hover:bg-[#3e3e42] rounded transition-colors active:bg-[#555555]"
    >
      <div className="text-[#e6e6e6]">{icon}</div>
      <div className="text-[9px] text-[#e6e6e6] whitespace-nowrap text-center">{label}</div>
    </button>
  )
}
