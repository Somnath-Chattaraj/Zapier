"use client"
import { PrimaryButton, SecondaryButton } from "./Button"
import { useRouter } from "next/navigation"
import { CheckCircle, Sparkles } from "lucide-react"

const Hero = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex flex-col justify-center items-center px-4 py-20">
        <div className="max-w-6xl w-full flex justify-center items-center flex-col">
          {/* Hero Badge */}
          <div className="mb-8 inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-3 shadow-lg">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">AI-Powered Automation</span>
          </div>

          {/* Main Heading */}
          <div className="text-5xl md:text-7xl font-bold flex w-full justify-center text-center mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
            Automate as fast as you can type
          </div>

          {/* Subheading */}
          <div className="flex justify-center items-center text-xl md:text-2xl mx-5 text-center max-w-4xl text-slate-600 leading-relaxed">
            AI gives you automation superpowers, and our platform puts them to work. Pairing AI with smart workflows
            helps you turn ideas into automated processes that work for you.
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-10 flex flex-col sm:flex-row gap-4">
          <PrimaryButton
            onClick={() => {
              router.push("/signup")
            }}
            children={"Get started for free"}
          />
          <SecondaryButton
            onClick={() => {
              router.push("/sales")
            }}
            children={"Contact Sales"}
          />
        </div>

        {/* Feature Points */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-6 md:gap-8 max-w-4xl">
          <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-3 shadow-md border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-700">Free forever</span>
            <span className="text-slate-600">for core features</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-3 shadow-md border border-blue-200">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-700">More integrations</span>
            <span className="text-slate-600">than any other platform</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-3 shadow-md border border-purple-200">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-700">Cutting-edge</span>
            <span className="text-slate-600">AI features</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
