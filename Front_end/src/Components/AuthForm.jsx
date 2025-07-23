import React from 'react';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

export default function AuthForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-6xl backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/10">
        {/* Left Panel - Visual Section */}
        <div className="hidden md:flex flex-col justify-between p-10 text-white relative overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="text-xl font-bold">AIWrite</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Unlock the Power of</h2>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              AI Writing Assistant
            </h2>
            <p className="mt-6 text-gray-300 leading-relaxed">
              Join thousands of creators who are crafting amazing content with our AI-powered tools. 
              From blogs to business copy, we've got you covered.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex -space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30" />
              ))}
              <div className="w-10 h-10 rounded-full bg-purple-500/90 border-2 border-white/30 flex items-center justify-center text-xs font-bold">
                +2K
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <p className="text-sm italic mb-2">"This tool revolutionized my writing workflow!"</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-400 mr-2" />
                <div>
                  <p className="text-xs font-medium">Sarah Johnson</p>
                  <p className="text-xs text-gray-400">Content Creator</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purple-600/20 blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-pink-600/20 blur-xl" />
          <div className="absolute top-1/3 right-10 w-20 h-20 rounded-full bg-blue-600/20 blur-lg" />
        </div>

        {/* Right Panel - Form Section */}
        <div className="p-8 md:p-12 text-white bg-gradient-to-b from-white/5 to-transparent">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
            <p className="text-gray-400 mt-2">
              {isLogin ? 'Sign in to continue to AIWrite' : 'Start your journey with us'}
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-all text-white font-medium py-2.5 rounded-lg border border-white/10 text-sm">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-all text-white font-medium py-2.5 rounded-lg border border-white/10 text-sm">
              <img src="https://www.svgrepo.com/show/475647/github-filled.svg" alt="GitHub" className="w-4 h-4" />
              GitHub
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-all text-white font-medium py-2.5 rounded-lg border border-white/10 text-sm">
              <img src="https://www.svgrepo.com/show/475700/apple.svg" alt="Apple" className="w-4 h-4" />
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-grow border-gray-700" />
            <span className="text-gray-400 text-xs">OR CONTINUE WITH</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          {/* Form */}
          <form className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <label className="block text-xs text-gray-400 mb-1">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            )}
            
            <div className="relative">
              <label className="block text-xs text-gray-400 mb-1">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-xs text-gray-400 mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">Minimum 8 characters with at least one number</p>
              )}
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox rounded bg-white/10 border-white/10 text-purple-500 focus:ring-purple-500" />
                  <span className="ml-2 text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-purple-400 hover:underline">Forgot password?</a>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-400">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)} className="text-purple-400 hover:underline font-medium">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="text-purple-400 hover:underline font-medium">
                  Sign in
                </button>
              </>
            )}
          </div>
          
          {/* Terms */}
          {!isLogin && (
            <p className="mt-4 text-center text-xs text-gray-500">
              By signing up, you agree to our <a href="#" className="text-purple-400 hover:underline">Terms</a> and <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}