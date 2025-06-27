"use client";

import { BACKEND_URL } from "@/app/config";
import AppBar from "@/components/AppBar";
import { PrimaryButton } from "@/components/Button";
import { LinkButton } from "@/components/buttons/LinkButton";
import { Input } from "@/components/Input";
import { ZapCell } from "@/components/ZapCell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, X, Zap, ArrowDown, Settings, Check, Mail, Send, Workflow, Play } from "lucide-react";

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`, {
            withCredentials: true
        })
            .then(x => setAvailableTriggers(x.data))

        axios.get(`${BACKEND_URL}/api/v1/action/available`, {
            withCredentials: true
        })
            .then(x => setAvailableActions(x.data))
    }, [])

    return {
        availableActions,
        availableTriggers
    }
}

export default function CreateWorkflow() {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string;
        name: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: any;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);
    const [isPublishing, setIsPublishing] = useState(false);

    const handlePublish = async () => {
        if (!selectedTrigger?.id) {
            alert("Please select a trigger first");
            return;
        }

        if (selectedActions.length === 0) {
            alert("Please add at least one action");
            return;
        }

        setIsPublishing(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
                "availableTriggerId": selectedTrigger.id,
                "triggerMetadata": {},
                "actions": selectedActions.map(a => ({
                    availableActionId: a.availableActionId,
                    actionMetadata: a.metadata
                }))
            }, {
                withCredentials: true
            });
            
            router.push("/dashboard");
        } catch (error) {
            console.error("Error publishing workflow:", error);
            alert("Error publishing workflow");
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <AppBar signup={false} contactSales={true} threeLines={true} Login={false} network={true} />
            
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                                <Workflow className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Create Workflow</h1>
                                <p className="text-slate-600 mt-1">Build your automated workflow step by step</p>
                            </div>
                        </div>
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing || !selectedTrigger?.id || selectedActions.length === 0}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-md"
                        >
                            {isPublishing ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                    <span>Publish Workflow</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Workflow Builder */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="space-y-8">
                    
                    {/* Trigger Step */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 w-full max-w-md hover:shadow-xl transition-all duration-200 group">
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-full">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    {selectedTrigger?.name || "Select Trigger"}
                                </h3>
                                <p className="text-slate-600 text-sm mb-4">
                                    Choose what starts your workflow
                                </p>
                                <button
                                    onClick={() => setSelectedModalIndex(1)}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    {selectedTrigger?.name ? "Change Trigger" : "Add Trigger"}
                                </button>
                            </div>
                        </div>
                        
                        {(selectedTrigger || selectedActions.length > 0) && (
                            <div className="flex items-center justify-center py-6">
                                <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-full">
                                    <ArrowDown className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Steps */}
                    {selectedActions.map((action, index) => (
                        <div key={action.index} className="flex flex-col items-center">
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 w-full max-w-md hover:shadow-xl transition-all duration-200 group">
                                <div className="text-center">
                                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
                                            <Settings className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                        {action.availableActionName || `Action ${index + 1}`}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-4">
                                        Configure what happens next
                                    </p>
                                    <button
                                        onClick={() => setSelectedModalIndex(action.index)}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        {action.availableActionName ? "Edit Action" : "Configure Action"}
                                    </button>
                                </div>
                            </div>
                            
                            {index < selectedActions.length - 1 && (
                                <div className="flex items-center justify-center py-6">
                                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-full">
                                        <ArrowDown className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Add Action Button */}
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => {
                                setSelectedActions(a => [...a, {
                                    index: a.length + 2,
                                    availableActionId: "",
                                    availableActionName: "",
                                    metadata: {}
                                }])
                            }}
                            className="inline-flex items-center space-x-3 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-600 hover:text-blue-600 px-8 py-6 rounded-2xl font-medium transition-all duration-200 shadow-sm hover:shadow-lg group"
                        >
                            <div className="bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 p-2 rounded-full transition-all duration-200">
                                <Plus className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-lg">Add Action</span>
                        </button>
                    </div>

                    {/* Progress Indicator */}
                    {selectedTrigger && (
                        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mt-12">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                        <Check className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Workflow Progress</h4>
                                        <p className="text-slate-600 text-sm">
                                            {selectedTrigger ? "✓ Trigger selected" : "Select a trigger"} • 
                                            {selectedActions.length > 0 ? ` ${selectedActions.length} action${selectedActions.length > 1 ? 's' : ''} configured` : " Add actions"}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-slate-900">
                                        {Math.round(((selectedTrigger ? 1 : 0) + selectedActions.length) / Math.max(2, selectedActions.length + 1) * 100)}%
                                    </div>
                                    <div className="text-slate-600 text-sm">Complete</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {selectedModalIndex && (
                <Modal 
                    availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions} 
                    onSelect={(props: null | { name: string; id: string; metadata: any; }) => {
                        if (props === null) {
                            setSelectedModalIndex(null);
                            return;
                        }
                        if (selectedModalIndex === 1) {
                            setSelectedTrigger({
                                id: props.id,
                                name: props.name
                            })
                        } else {
                            setSelectedActions(a => {
                                let newActions = [...a];
                                newActions[selectedModalIndex - 2] = {
                                    index: selectedModalIndex,
                                    availableActionId: props.id,
                                    availableActionName: props.name,
                                    metadata: props.metadata
                                }
                                return newActions
                            })
                        }
                        setSelectedModalIndex(null);
                    }} 
                    index={selectedModalIndex} 
                />
            )}
        </div>
    );
}

function Modal({ index, onSelect, availableItems }: { 
    index: number, 
    onSelect: (props: null | { name: string; id: string; metadata: any; }) => void, 
    availableItems: {id: string, name: string, image: string;}[] 
}) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
    }>();
    const isTrigger = index === 1;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[90vh] mx-4">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                    {isTrigger ? <Zap className="w-6 h-6 text-white" /> : <Settings className="w-6 h-6 text-white" />}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Select {isTrigger ? "Trigger" : "Action"}
                                    </h2>
                                    <p className="text-blue-100 text-sm">
                                        {isTrigger ? "Choose what starts your workflow" : "Choose what action to perform"}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => onSelect(null)}
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 max-h-96 overflow-y-auto">
                        {step === 1 && selectedAction?.id === "email" && (
                            <EmailSelector setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata
                                })
                            }} />
                        )}

                        {step === 1 && selectedAction?.id === "send-sol" && (
                            <SolanaSelector setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata
                                })
                            }} />
                        )}

                        {step === 0 && (
                            <div className="space-y-3">
                                {availableItems?.map(({id, name, image}) => (
                                    <div 
                                        key={id}
                                        onClick={() => {
                                            if (isTrigger) {
                                                onSelect({
                                                    id,
                                                    name,
                                                    metadata: {}
                                                })
                                            } else {
                                                setStep(s => s + 1);
                                                setSelectedAction({
                                                    id,
                                                    name
                                                })
                                            }
                                        }} 
                                        className="flex items-center space-x-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-200 group"
                                    >
                                        <img src={image} width={40} height={40} className="rounded-lg shadow-sm" alt={name} />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                {name}
                                            </h3>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowDown className="w-5 h-5 text-blue-600 rotate-[-90deg]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}                    
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmailSelector({setMetadata}: {
    setMetadata: (params: any) => void;
}) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                    <Mail className="w-6 h-6 text-blue-600 mx-auto mt-1" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Configure Email</h3>
                <p className="text-slate-600 text-sm">Set up your email action</p>
            </div>
            
            <div className="space-y-4">
                <Input 
                    label="To" 
                    type="text" 
                    placeholder="recipient@example.com" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    label="Body" 
                    type="text" 
                    placeholder="Enter your message..." 
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            
            <button
                onClick={() => {
                    setMetadata({
                        email,
                        body
                    })
                }}
                disabled={!email || !body}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none"
            >
                Save Email Configuration
            </button>
        </div>
    );
}

function SolanaSelector({setMetadata}: {
    setMetadata: (params: any) => void;
}) {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");    

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                    <Send className="w-6 h-6 text-purple-600 mx-auto mt-1" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Configure Solana Transfer</h3>
                <p className="text-slate-600 text-sm">Set up your SOL transfer</p>
            </div>
            
            <div className="space-y-4">
                <Input 
                    label="To Address" 
                    type="text" 
                    placeholder="Solana wallet address" 
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Input 
                    label="Amount (SOL)" 
                    type="text" 
                    placeholder="0.1" 
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            
            <button
                onClick={() => {
                    setMetadata({
                        amount,
                        address
                    })
                }}
                disabled={!amount || !address}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none"
            >
                Save Transfer Configuration
            </button>
        </div>
    );
}