"use client"

import { useRouter } from "next/navigation"
import { Menu, Globe, Zap } from "lucide-react"

const AppBar = ({
  threeLines = true,
  contactSales = true,
  Login = true,
  signup = true,
  network = true,
}: {
  threeLines: boolean
  contactSales: boolean
  Login: boolean
  signup: boolean
  network: boolean
}) => {
  const router = useRouter()

  return (
    <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center h-16 max-w-7xl mx-auto px-4">
        {/* Left Section */}
        <div className="flex justify-center items-center space-x-4">

          {/* Logo */}
          <div
            onClick={() => {
              router.push("/")
            }}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AutoFlow
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {network && (
            <div className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
              <Globe className="w-5 h-5 text-slate-600" />
            </div>
          )}

          {contactSales && (
            <button className="hover:bg-slate-100 text-slate-700 hover:text-slate-900 py-2 px-4 rounded-lg transition-all duration-200 font-medium">
              Contact Sales
            </button>
          )}

          {Login && (
            <button
              onClick={() => {
                router.push("/signin")
              }}
              className="hover:bg-slate-100 text-slate-700 hover:text-slate-900 py-2 px-4 rounded-lg transition-all duration-200 font-medium"
            >
              Log in
            </button>
          )}

          {signup && (
            <button
              onClick={() => {
                router.push("/signup")
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 py-2.5 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Sign up
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppBar
