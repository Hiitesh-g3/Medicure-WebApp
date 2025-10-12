import { AlertCircle, Send, Stethoscope } from 'lucide-react'
import React, { useState } from 'react'

const SymptomCheckerPage = () => {
  const [symptoms, setSymptoms] = useState('');
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="bg-red-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Symptom Checker</h1>
          <p className="text-xl text-gray-300">Describe your symptoms for preliminary assessment</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
          <div className="mb-6">
            <label className="block text-white text-lg font-semibold mb-4">
              Describe your symptoms in detail:
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g., I have been experiencing headaches for the past 3 days, along with mild fever and fatigue..."
              className="w-full h-32 bg-gray-700/50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-red-400 focus:outline-none transition-colors duration-200"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold flex items-center justify-center">
            <Send className="h-5 w-5 mr-2" />
            Analyze Symptoms
          </button>

          <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-yellow-400 mt-1 mr-3" />
              <div>
                <h4 className="text-white font-semibold mb-2">Important Disclaimer</h4>
                <p className="text-gray-300 text-sm">
                  This tool provides preliminary information only and should not replace professional medical advice. 
                  Always consult with a healthcare provider for accurate diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymptomCheckerPage