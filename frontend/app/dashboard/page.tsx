"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { useRouter } from "next/navigation";
import AppBar from "@/components/AppBar";
import { DarkButton } from "@/components/buttons/DarkButton";
import { LinkButton } from "@/components/buttons/LinkButton";
import { Clock, Workflow, ExternalLink, Plus } from "lucide-react";

interface Zap {
    id: string;
    triggerId: string;
    userId: number;
    actions: {
        id: string;
        zapId: string;
        actionId: string;
        sortingOrder: number;
        type: {
            id: string;
            name: string;
            image: string;
        }
    }[];
    trigger: {
        id: string;
        zapId: string;
        triggerId: string;
        type: {
            id: string;
            name: string;
            image: string;
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data);
                setZaps(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching zaps:", err);
                setLoading(false);
            });
    }, []);
    return {
        loading, zaps
    }
}

export default function() {
    const { loading, zaps } = useZaps();
    const router = useRouter();
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <AppBar signup={false} Login={false} contactSales={true} threeLines={true} network={true} />
            
            {/* Hero Section */}
            <div className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                                <Workflow className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">My Workflows</h1>
                                <p className="text-slate-600 mt-1">Manage and monitor your automated workflows</p>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push("/zap/create")}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                    <ZapTable zaps={zaps} />
                )}
            </div>
        </div>
    );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    if (zaps.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-6">
                        <Workflow className="w-12 h-12 text-blue-600 mx-auto mt-2" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">No workflows yet</h3>
                    <p className="text-slate-600 mb-6">Create your first automated workflow to get started</p>
                    <button
                        onClick={() => router.push("/zap/create")}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create First Workflow</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200">
                <div className="grid grid-cols-12 gap-4 font-semibold text-slate-700">
                    <div className="col-span-3">Workflow</div>
                    <div className="col-span-2">ID</div>
                    <div className="col-span-2">Created</div>
                    <div className="col-span-4">Webhook URL</div>
                    <div className="col-span-1">Actions</div>
                </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
                {zaps.map((z, index) => (
                    <div 
                        key={z.id} 
                        className={`grid grid-cols-12 gap-4 px-8 py-6 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                        }`}
                    >
                        {/* Workflow Flow */}
                        <div className="col-span-3 flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <img 
                                        src={z.trigger.type.image} 
                                        className="w-10 h-10 rounded-lg shadow-md border-2 border-white" 
                                        alt={z.trigger.type.name}
                                    />
                                </div>
                                <div className="flex items-center space-x-1">
                                    {z.actions.map((action, idx) => (
                                        <div key={action.id} className="flex items-center space-x-1">
                                            <div className="w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                                            <img 
                                                src={action.type.image} 
                                                className="w-8 h-8 rounded-lg shadow-sm border border-slate-200" 
                                                alt={action.type.name}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ID */}
                        <div className="col-span-2 flex items-center">
                            <span className="font-mono text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                                {z.id.substring(0, 8)}...
                            </span>
                        </div>

                        {/* Created Date */}
                        <div className="col-span-2 flex items-center space-x-2 text-slate-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Nov 13, 2023</span>
                        </div>

                        {/* Webhook URL */}
                        <div className="col-span-4 flex items-center">
                            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-full max-w-sm">
                                <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                <span className="text-sm text-slate-600 truncate font-mono">
                                    {`${HOOKS_URL}/hooks/catch/1/${z.id}`}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="col-span-1 flex items-center justify-center">
                            <button
                                onClick={() => router.push("/zap/" + z.id)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}