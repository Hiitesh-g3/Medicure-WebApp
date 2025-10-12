import { useState } from 'react';

// Login Page Component
function LoginPage({ onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = () => {
    console.log('Login attempt:', formData);
    // Add your login logic here
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-in placeholder');
    // Add your Google sign-in logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800 placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800 placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200"
            >
              Login
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign-in Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-3 transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>

          {/* Switch to Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

// Register Page Component
function RegisterPage({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = () => {
    console.log('Register attempt:', formData);
    // Add your registration logic here
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign-up placeholder');
    // Add your Google sign-up logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join us and start your journey today</p>
          </div>

          {/* Register Form */}
          <div className="space-y-6">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800 placeholder-gray-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800 placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800 placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-800 placeholder-gray-500"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200"
            >
              Register
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign-up Button */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-3 transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign up with Google</span>
            </button>
          </div>

          {/* Switch to Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function LoginRegisterApp() {
  const [currentPage, setCurrentPage] = useState('login');

  const switchToLogin = () => {
    setCurrentPage('login');
  };

  const switchToRegister = () => {
    setCurrentPage('register');
  };

  return (
    <>
      {currentPage === 'login' && (
        <LoginPage onSwitchToRegister={switchToRegister} />
      )}
      {currentPage === 'register' && (
        <RegisterPage onSwitchToLogin={switchToLogin} />
      )}
    </>
  );
}









































































// import React, { useState } from 'react';
// import { 
//   Pill, 
//   FileText, 
//   Stethoscope, 
//   DollarSign, 
//   Upload, 
//   Search,
//   Star,
//   MapPin,
//   CheckCircle,
//   AlertCircle,
//   Camera,
//   Send
// } from 'lucide-react';

// const MeddyBuddy = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [symptoms, setSymptoms] = useState('');
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const popularMedicines = [
//     'Lipitor', 'Nexium', 'Humira', 'Advair', 'Crestor', 
//     'Januvia', 'Lantus', 'Lyrica', 'Symbicort', 'Viagra'
//   ];

//   const genericAlternatives = [
//     {
//       name: 'Atorvastatin Generic',
//       manufacturer: 'Teva Pharmaceuticals',
//       price: '$12.99',
//       savings: '93%',
//       rating: '4.8/5',
//       stock: 'In Stock',
//       pharmacy: 'CVS Pharmacy',
//       distance: '0.5 miles',
//       composition: 'Same active ingredient',
//       effectiveness: 'FDA-approved equivalent'
//     },
//     {
//       name: 'Rosuvastatin Generic',
//       manufacturer: 'Sandoz',
//       price: '$15.49',
//       savings: '92%',
//       rating: '4.7/5',
//       stock: 'In Stock',
//       pharmacy: 'Walgreens',
//       distance: '1.2 miles',
//       composition: 'Alternative statin',
//       effectiveness: 'Similar cholesterol-lowering effect'
//     },
//     {
//       name: 'Simvastatin',
//       manufacturer: 'Mylan',
//       price: '$8.99',
//       savings: '95%',
//       rating: '4.6/5',
//       stock: 'Limited Stock',
//       pharmacy: 'Rite Aid',
//       distance: '2.1 miles',
//       composition: 'Different statin class',
//       effectiveness: 'Proven cholesterol reduction'
//     }
//   ];

//   const Header = () => (
//     <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-green-400 text-white p-4 shadow-lg">
//       <div className="container mx-auto flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
//             <Stethoscope className="h-8 w-8" />
//           </div>
//           <h1 className="text-2xl font-bold">Meddy Buddy</h1>
//         </div>
//         <nav className="flex space-x-2">
//           {[
//             { id: 'home', label: 'Home' },
//             { id: 'medicine-id', label: 'Medicine ID' },
//             { id: 'report-scanner', label: 'Report Scanner' },
//             { id: 'symptom-checker', label: 'Symptom Checker' },
//             { id: 'alternatives', label: 'Alternatives' }
//           ].map(nav => (
//             <button
//               key={nav.id}
//               onClick={() => setCurrentPage(nav.id)}
//               className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                 currentPage === nav.id 
//                   ? 'bg-white text-blue-600 shadow-lg' 
//                   : 'hover:bg-white/20 backdrop-blur-sm'
//               }`}
//             >
//               {nav.label}
//             </button>
//           ))}
//         </nav>
//         <div className="flex items-center space-x-4">
//           <span className="text-sm">🌐 EN</span>
//           <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//             👤
//           </div>
//         </div>
//       </div>
//     </header>
//   );

//   const HomePage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//       <div className="container mx-auto px-6 py-16">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-white mb-6">Choose Your Health Assistant</h1>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Select from our comprehensive suite of medical tools designed to help you make informed health decisions.
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//           {[
//             {
//               icon: Pill,
//               title: 'Medicine Identification',
//               description: 'Upload a photo of any pill or medicine to get instant identification, usage instructions, and safety information.',
//               color: 'from-blue-400 to-blue-600',
//               page: 'medicine-id'
//             },
//             {
//               icon: FileText,
//               title: 'Report Scanner & Simplifier',
//               description: 'Upload medical reports and get easy-to-understand explanations with highlighted key values and recommendations.',
//               color: 'from-green-400 to-green-600',
//               page: 'report-scanner'
//             },
//             {
//               icon: Stethoscope,
//               title: 'Symptom Checker',
//               description: 'Describe your symptoms and get preliminary assessments with recommendations for next steps and care.',
//               color: 'from-red-400 to-red-600',
//               page: 'symptom-checker'
//             },
//             {
//               icon: DollarSign,
//               title: 'Affordable Alternatives',
//               description: 'Find cheaper generic alternatives for expensive medicines while ensuring the same therapeutic effect.',
//               color: 'from-green-500 to-green-700',
//               page: 'alternatives'
//             }
//           ].map((tool, index) => (
//             <div
//               key={index}
//               onClick={() => setCurrentPage(tool.page)}
//               className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl border border-gray-700/50"
//             >
//               <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                 <tool.icon className="h-8 w-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
//               <p className="text-gray-300 leading-relaxed">{tool.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const MedicineIdPage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-8">
//       <div className="container mx-auto max-w-4xl">
//         <div className="text-center mb-12">
//           <div className="bg-blue-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
//             <Pill className="h-10 w-10 text-blue-400" />
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-4">Medicine Identification</h1>
//           <p className="text-xl text-gray-300">Upload a photo to identify any medication instantly</p>
//         </div>

//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
//           <div className="border-4 border-dashed border-gray-600 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors duration-300">
//             <Camera className="h-16 w-16 text-gray-400 mx-auto mb-6" />
//             <h3 className="text-2xl font-semibold text-white mb-4">Upload Medicine Photo</h3>
//             <p className="text-gray-400 mb-6">Drag and drop your image here, or click to browse</p>
//             <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold">
//               Choose File
//             </button>
//           </div>

//           <div className="mt-8 p-6 bg-gray-700/30 rounded-2xl">
//             <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
//               <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
//               What you'll get:
//             </h4>
//             <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
//               <div>• Medicine name & brand</div>
//               <div>• Dosage information</div>
//               <div>• Usage instructions</div>
//               <div>• Side effects</div>
//               <div>• Safety warnings</div>
//               <div>• Storage guidelines</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const ReportScannerPage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-900 p-8">
//       <div className="container mx-auto max-w-4xl">
//         <div className="text-center mb-12">
//           <div className="bg-green-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
//             <FileText className="h-10 w-10 text-green-400" />
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-4">Report Scanner & Simplifier</h1>
//           <p className="text-xl text-gray-300">Get easy explanations of your medical reports</p>
//         </div>

//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
//           <div className="border-4 border-dashed border-gray-600 rounded-2xl p-12 text-center hover:border-green-400 transition-colors duration-300">
//             <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6" />
//             <h3 className="text-2xl font-semibold text-white mb-4">Upload Medical Report</h3>
//             <p className="text-gray-400 mb-6">Supports PDF, JPG, PNG formats</p>
//             <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold">
//               Upload Report
//             </button>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6 mt-8">
//             <div className="p-6 bg-gray-700/30 rounded-2xl">
//               <h4 className="text-lg font-semibold text-white mb-4">✨ Key Features</h4>
//               <div className="space-y-2 text-sm text-gray-300">
//                 <div>• Highlighted abnormal values</div>
//                 <div>• Plain English explanations</div>
//                 <div>• Trend analysis</div>
//                 <div>• Recommendations</div>
//               </div>
//             </div>
//             <div className="p-6 bg-gray-700/30 rounded-2xl">
//               <h4 className="text-lg font-semibold text-white mb-4">📋 Supported Reports</h4>
//               <div className="space-y-2 text-sm text-gray-300">
//                 <div>• Blood tests</div>
//                 <div>• X-rays & scans</div>
//                 <div>• Lab results</div>
//                 <div>• Prescription summaries</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const SymptomCheckerPage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 p-8">
//       <div className="container mx-auto max-w-4xl">
//         <div className="text-center mb-12">
//           <div className="bg-red-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
//             <Stethoscope className="h-10 w-10 text-red-400" />
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-4">Symptom Checker</h1>
//           <p className="text-xl text-gray-300">Describe your symptoms for preliminary assessment</p>
//         </div>

//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
//           <div className="mb-6">
//             <label className="block text-white text-lg font-semibold mb-4">
//               Describe your symptoms in detail:
//             </label>
//             <textarea
//               value={symptoms}
//               onChange={(e) => setSymptoms(e.target.value)}
//               placeholder="E.g., I have been experiencing headaches for the past 3 days, along with mild fever and fatigue..."
//               className="w-full h-32 bg-gray-700/50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-red-400 focus:outline-none transition-colors duration-200"
//             />
//           </div>

//           <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold flex items-center justify-center">
//             <Send className="h-5 w-5 mr-2" />
//             Analyze Symptoms
//           </button>

//           <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
//             <div className="flex items-start">
//               <AlertCircle className="h-6 w-6 text-yellow-400 mt-1 mr-3" />
//               <div>
//                 <h4 className="text-white font-semibold mb-2">Important Disclaimer</h4>
//                 <p className="text-gray-300 text-sm">
//                   This tool provides preliminary information only and should not replace professional medical advice. 
//                   Always consult with a healthcare provider for accurate diagnosis and treatment.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const AlternativesPage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-900 p-8">
//       <div className="container mx-auto max-w-6xl">
//         <div className="text-center mb-12">
//           <div className="bg-green-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
//             <DollarSign className="h-10 w-10 text-green-400" />
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-4">Affordable Medicine Alternatives</h1>
//           <p className="text-xl text-gray-300">Find cheaper generic alternatives and compare prices from nearby pharmacies</p>
//         </div>

//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 mb-8">
//           <h3 className="text-2xl font-semibold text-white mb-6">Search for Medicine</h3>
          
//           <div className="flex gap-4 mb-6">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Enter medicine name (e.g., Lipitor, Nexium, Advair)"
//               className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
//             />
//             <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center">
//               <Search className="h-5 w-5 mr-2" />
//               Search
//             </button>
//           </div>

//           <div>
//             <p className="text-gray-400 mb-4">Popular searches:</p>
//             <div className="flex flex-wrap gap-3">
//               {popularMedicines.map((medicine, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSearchQuery(medicine)}
//                   className="bg-gray-700/50 text-gray-300 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
//                 >
//                   {medicine}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Sample Results for Lipitor */}
//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 mb-8">
//           <div className="flex justify-between items-start mb-6">
//             <div>
//               <h3 className="text-2xl font-bold text-white">Original Medicine</h3>
//               <h4 className="text-3xl font-bold text-blue-400 mt-2">Lipitor 20mg</h4>
//               <p className="text-gray-400">Atorvastatin</p>
//               <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm mt-2">
//                 Cholesterol Medication
//               </span>
//             </div>
//             <div className="text-right">
//               <div className="text-3xl font-bold text-red-400">$185.99</div>
//               <p className="text-gray-400">Brand price</p>
//             </div>
//           </div>
          
//           <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
//             <div className="flex justify-between items-center">
//               <h4 className="text-xl font-semibold text-white">Potential Savings</h4>
//               <div className="text-3xl font-bold text-green-400">$173.00</div>
//             </div>
//             <p className="text-gray-400 mt-1">per month with generic alternatives</p>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {genericAlternatives.map((alternative, index) => (
//             <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700 hover:border-green-400/50 transition-colors duration-300">
//               <div className="flex justify-between items-start mb-4">
//                 <h4 className="text-xl font-bold text-white">{alternative.name}</h4>
//                 <span className={`px-3 py-1 rounded-full text-sm ${
//                   alternative.stock === 'In Stock' 
//                     ? 'bg-green-500/20 text-green-400' 
//                     : 'bg-yellow-500/20 text-yellow-400'
//                 }`}>
//                   {alternative.stock}
//                 </span>
//               </div>
              
//               <p className="text-gray-400 mb-4">{alternative.manufacturer}</p>
              
//               <div className="flex justify-between items-center mb-4">
//                 <div className="text-2xl font-bold text-green-400">{alternative.price}</div>
//                 <div className="text-green-400 font-semibold">💰 Save {alternative.savings}</div>
//               </div>
              
//               <div className="flex items-center mb-4">
//                 <Star className="h-4 w-4 text-yellow-400 mr-1" />
//                 <span className="text-white font-semibold">{alternative.rating}</span>
//                 <span className="text-gray-400 ml-2">(verified reviews)</span>
//               </div>
              
//               <div className="flex items-center text-gray-400 mb-4">
//                 <MapPin className="h-4 w-4 mr-2" />
//                 <span>{alternative.pharmacy} • {alternative.distance}</span>
//               </div>
              
//               <div className="space-y-2 mb-6 text-sm">
//                 <div className="text-gray-300">
//                   <strong className="text-white">Composition:</strong> {alternative.composition}
//                 </div>
//                 <div className="text-gray-300">
//                   <strong className="text-white">Effectiveness:</strong> {alternative.effectiveness}
//                 </div>
//               </div>
              
//               <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold">
//                 🛒 Check Availability
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderPage = () => {
//     switch(currentPage) {
//       case 'medicine-id': return <MedicineIdPage />;
//       case 'report-scanner': return <ReportScannerPage />;
//       case 'symptom-checker': return <SymptomCheckerPage />;
//       case 'alternatives': return <AlternativesPage />;
//       default: return <HomePage />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <Header />
//       {renderPage()}
//     </div>
//   );
// };

// export default MeddyBuddy;