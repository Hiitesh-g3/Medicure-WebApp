import { DollarSign, MapPin, Search, Star } from 'lucide-react'
import React, { useState } from 'react'

const AlternativesPage = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const popularMedicines = [
    'Lipitor', 'Nexium', 'Humira', 'Advair', 'Crestor', 
    'Januvia', 'Lantus', 'Lyrica', 'Symbicort', 'Viagra'
  ];

  const genericAlternatives = [
    {
      name: 'Atorvastatin Generic',
      manufacturer: 'Teva Pharmaceuticals',
      price: '$12.99',
      savings: '93%',
      rating: '4.8/5',
      stock: 'In Stock',
      pharmacy: 'CVS Pharmacy',
      distance: '0.5 miles',
      composition: 'Same active ingredient',
      effectiveness: 'FDA-approved equivalent'
    },
    {
      name: 'Rosuvastatin Generic',
      manufacturer: 'Sandoz',
      price: '$15.49',
      savings: '92%',
      rating: '4.7/5',
      stock: 'In Stock',
      pharmacy: 'Walgreens',
      distance: '1.2 miles',
      composition: 'Alternative statin',
      effectiveness: 'Similar cholesterol-lowering effect'
    },
    {
      name: 'Simvastatin',
      manufacturer: 'Mylan',
      price: '$8.99',
      savings: '95%',
      rating: '4.6/5',
      stock: 'Limited Stock',
      pharmacy: 'Rite Aid',
      distance: '2.1 miles',
      composition: 'Different statin class',
      effectiveness: 'Proven cholesterol reduction'
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-900 p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="bg-green-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <DollarSign className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Affordable Medicine Alternatives</h1>
          <p className="text-xl text-gray-300">Find cheaper generic alternatives and compare prices from nearby pharmacies</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 mb-8">
          <h3 className="text-2xl font-semibold text-white mb-6">Search for Medicine</h3>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter medicine name (e.g., Lipitor, Nexium, Advair)"
              className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>

          <div>
            <p className="text-gray-400 mb-4">Popular searches:</p>
            <div className="flex flex-wrap gap-3">
              {popularMedicines.map((medicine, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(medicine)}
                  className="bg-gray-700/50 text-gray-300 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  {medicine}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sample Results for Lipitor */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Original Medicine</h3>
              <h4 className="text-3xl font-bold text-blue-400 mt-2">Lipitor 20mg</h4>
              <p className="text-gray-400">Atorvastatin</p>
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm mt-2">
                Cholesterol Medication
              </span>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-400">$185.99</div>
              <p className="text-gray-400">Brand price</p>
            </div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold text-white">Potential Savings</h4>
              <div className="text-3xl font-bold text-green-400">$173.00</div>
            </div>
            <p className="text-gray-400 mt-1">per month with generic alternatives</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {genericAlternatives.map((alternative, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700 hover:border-green-400/50 transition-colors duration-300">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-white">{alternative.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  alternative.stock === 'In Stock' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {alternative.stock}
                </span>
              </div>
              
              <p className="text-gray-400 mb-4">{alternative.manufacturer}</p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold text-green-400">{alternative.price}</div>
                <div className="text-green-400 font-semibold">💰 Save {alternative.savings}</div>
              </div>
              
              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-white font-semibold">{alternative.rating}</span>
                <span className="text-gray-400 ml-2">(verified reviews)</span>
              </div>
              
              <div className="flex items-center text-gray-400 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{alternative.pharmacy} • {alternative.distance}</span>
              </div>
              
              <div className="space-y-2 mb-6 text-sm">
                <div className="text-gray-300">
                  <strong className="text-white">Composition:</strong> {alternative.composition}
                </div>
                <div className="text-gray-300">
                  <strong className="text-white">Effectiveness:</strong> {alternative.effectiveness}
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold">
                🛒 Check Availability
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlternativesPage