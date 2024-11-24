"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";

import { useRouter } from "next/navigation";
import AppBar from "@/components/AppBar";
import { DarkButton } from "@/components/buttons/DarkButton";
import { LinkButton } from "@/components/buttons/LinkButton";

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
                console.log(res.data); // Add this line to inspect the response
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
    
    return <div>
        <AppBar signup={false} Login={false} contactSales={true} threeLines={true} network={true} />
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg	 w-full">
                <div className="flex justify-between pr-8 ">
                    <div className="text-2xl font-bold">
                        My Zaps
                    </div>
                    <DarkButton onClick={() => {
                        router.push("/zap/create");
                    }}>Create</DarkButton>
                </div>
            </div>
        </div>
        {loading ? "Loading..." : <div className="flex  justify-center"> <ZapTable zaps={zaps} /> </div>}
    </div>
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    return (
        <div className="p-8 max-w-screen-lg w-full">
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-6 py-3">
            <div className="flex font-bold text-gray-700">
                <div className="flex-1">Name</div>
                <div className="flex-1">ID</div>
                <div className="flex-1 px-2">Created at</div>
                <div className="flex-1 px-2">Webhook URL</div>
                <div className="flex-1 ml-10">Go</div>
            </div>
        </div>
        <div className="divide-y divide-gray-200">
            {zaps?.map((z, index) => (
                <div 
                    key={z.id} 
                    className={`flex px-6 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition duration-200 ease-in-out hover:bg-gray-100`}
                >
                    <div className="flex-1 flex items-center text-gray-800">
                        {/* <div className="font-medium">{z.trigger.type.name}</div> */}
                        <div className="ml-2 text-sm flex justify-between text-gray-500"><img src={z.trigger.type.image} className="w-[30px] h-[30px]" /> {z.actions.map(x => <img src={x.type.image} className="w-[30px] h-[30px]" />)}</div>
                    </div>
                    <div className="flex-1 text-gray-800">{z.id}</div>
                    <div className="flex-1 text-gray-600">Nov 13, 2023</div>
                    <div className="flex-1 text-gray-600"> {`${HOOKS_URL}/hooks/catch/1/${z.id}`} </div>
                    <div className="flex-1 flex justify-center">
                        <LinkButton 
                            onClick={() => router.push("/zap/" + z.id)} 
                        >
                            Go
                        </LinkButton>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>

    );
}
