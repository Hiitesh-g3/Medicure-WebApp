import { DollarSign, FileText, Pill, Stethoscope } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCurrentPage } from '../store/useCurrentPage';

const HomePage = () => {
  const {currentPage,setCurrentPage} = useCurrentPage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Choose Your Health Assistant</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Select from our comprehensive suite of medical tools designed to help you make informed health decisions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Pill,
              title: 'Medicine Identification',
              description: 'Upload a photo of any pill or medicine to get instant identification, usage instructions, and safety information.',
              color: 'from-blue-400 to-blue-600',
              page: 'medicine-id'
            },
            {
              icon: FileText,
              title: 'Report Scanner & Simplifier',
              description: 'Upload medical reports and get easy-to-understand explanations with highlighted key values and recommendations.',
              color: 'from-green-400 to-green-600',
              page: 'report-scanner'
            },
            {
              icon: Stethoscope,
              title: 'Symptom Checker',
              description: 'Describe your symptoms and get preliminary assessments with recommendations for next steps and care.',
              color: 'from-red-400 to-red-600',
              page: 'symptom-checker'
            },
            {
              icon: DollarSign,
              title: 'Affordable Alternatives',
              description: 'Find cheaper generic alternatives for expensive medicines while ensuring the same therapeutic effect.',
              color: 'from-green-500 to-green-700',
              page: 'alternatives'
            }
          ].map((tool, index) => (
            <Link to={`/${tool.page}`} onClick={() => setCurrentPage(tool.page)} key={index}>
            <div
              key={index}
              // onClick={() => setCurrentPage(tool.page)}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl border border-gray-700/50"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
              <p className="text-gray-300 leading-relaxed">{tool.description}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage