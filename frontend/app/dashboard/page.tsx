"use client";
import axios from 'axios';
import React from 'react'
import { BACKEND_URL } from '../config';
// import toggleOn from '@/public/toggle-on.svg';
// import toggleOff from '@/public/toggle-off.svg';
import AppBar from '@/components/AppBar';

interface Zap {
    "id": number,
    "name": string,
    "userId": number,
    "actions" : {
        "id" : string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type" : {
            "id" : string,
            "name": string,
        }
    }[]
}

function useZap() {
    const [loading, setLoading] = React.useState(true);
    const [zaps, setZaps] = React.useState<Zap[]>([]);

    React.useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {withCredentials: true}).then((res) => {
            setZaps(res.data);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
        });
    }, []);
    return {
        loading, zaps
    }
}
const dashboard = () => {
    const [on,setOn] = React.useState(false);
    const toggleOn = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      );
    
      const toggleOff = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
      const {loading, zaps} = useZap();
      
    return (
      <>
        <AppBar signup={false} contactSales={true} threeLines={true} Login={false} network={true} />
        <div className="w-full flex flex-col p-6">
          <p className="text-4xl my-5 font-bold">My Zaps (default folder)</p>
          <table className="table-auto border-collapse w-full bg-white shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <td className="py-3 px-6 text-center"></td>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Last Edit</th>
                <th className="py-3 px-6 text-left">Running</th>
                <th className="py-3 px-6 text-left"></th>
              </tr>
            </thead>
            {loading && <tbody className="text-gray-600 text-sm font-light">
                    <tr>Loading</tr>
                </tbody>}
            {!loading && <tbody className="text-gray-600 text-sm font-light">
              <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-center"><input type="checkbox" /></td>
                <td className="py-3 px-6 text-left">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className="py-3 px-6 text-left">Malcolm Lockyer</td>
                {/* <td className="py-3 px-6 text-left">1961</td> */}
                <td className='py-3 pl-12' onClick={() => {setOn(!on)}}> {on?toggleOn:toggleOff} </td>
                <td>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

                </td>
              </tr>
              
            </tbody>}
          </table>
        </div>
      </>
    )
  }
  

export default dashboard

