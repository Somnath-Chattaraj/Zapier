"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL, HOOKS_URL } from "../config"
import { useRouter } from "next/navigation"
import AppBar from "@/components/AppBar"
import { Clock, Workflow, Plus, Play, Settings, Copy } from "lucide-react"
import { toast } from "sonner"
import { CopyToClipboard } from "react-copy-to-clipboard"

interface Zap {
  id: string
  triggerId: string
  userId: number
  actions: {
    id: string
    zapId: string
    actionId: string
    sortingOrder: number
    type: {
      id: string
      name: string
      image: string
    }
  }[]
  trigger: {
    id: string
    zapId: string
    triggerId: string
    type: {
      id: string
      name: string
      image: string
    }
  }
}

function useZaps() {
  const [loading, setLoading] = useState(true)
  const [zaps, setZaps] = useState<Zap[]>([])

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
        setZaps(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching workflows:", err)
        setLoading(false)
      })
  }, [])

  return {
    loading,
    zaps,
  }
}

export default function WorkflowDashboard() {
  const { loading, zaps } = useZaps()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AppBar signup={false} Login={false} contactSales={true} threeLines={true} network={true} />

      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                <Workflow className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">My Workflows</h1>
                <p className="text-slate-600 mt-1">Manage and monitor your automated workflows</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/zap/create")}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Create Workflow</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-slate-600 mt-4">Loading your workflows...</p>
            </div>
          </div>
        ) : (
          <WorkflowTable zaps={zaps} />
        )}
      </div>
    </div>
  )
}

function WorkflowTable({ zaps }: { zaps: Zap[] }) {
  const router = useRouter()

  if (zaps.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Workflow className="w-12 h-12 text-blue-600 mx-auto mt-2" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">No workflows yet</h3>
          <p className="text-slate-600 mb-6">Create your first automated workflow to get started</p>
          <button
            onClick={() => router.push("/zap/create")}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Create First Workflow</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {zaps.map((workflow, index) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  )
}

function WorkflowCard({ workflow }: { workflow: Zap }) {
  const router = useRouter()
  const webhookUrl = `${HOOKS_URL}/hooks/catch/1/${workflow.id}`

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Workflow Flow Visualization */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <img
                  src={workflow.trigger.type.image || "/placeholder.svg"}
                  className="w-12 h-12 rounded-xl shadow-md border-2 border-white"
                  alt={workflow.trigger.type.name}
                />
              </div>

              {workflow.actions.map((action, idx) => (
                <div key={action.id} className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                  <img
                    src={action.type.image || "/placeholder.svg"}
                    className="w-10 h-10 rounded-xl shadow-sm border border-slate-200"
                    alt={action.type.name}
                  />
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                {workflow.trigger.type.name} → {workflow.actions.map((a) => a.type.name).join(" → ")}
              </h3>
              <p className="text-sm text-slate-500 font-mono">ID: {workflow.id.substring(0, 12)}...</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Webhook URL Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">Webhook URL</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <code className="text-sm text-slate-600 break-all">{webhookUrl}</code>
              </div>
              <CopyToClipboard
                text={webhookUrl}
                onCopy={() => {
                  toast.success("Webhook URL copied to clipboard!")
                }}
              >
                <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
