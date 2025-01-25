import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

interface CreateUserSchema {
  name: string;
  username: string;
  password: string;
  email: string;
}

interface LoginSchema {
  username: string;
  password: string;
}

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserSchema | LoginSchema>();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const handleFormSubmit = async (data: CreateUserSchema | LoginSchema) => {
    setLoadingBtn(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    setLoadingBtn(false);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}


      {/* Main Content */}
      <div className="min-h-screen w-full flex items-center justify-center pt-16">
        <div className="w-full max-w-md px-8 py-10 mx-4">
          <div className={`w-full ${isDark ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl shadow-xl p-8 border ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
            <div className="mb-8 text-center">
              <div className={`w-20 h-20 ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {isLogin ? (
                  <LoginIcon className={`h-10 w-10 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                ) : (
                  <PersonAddIcon className={`h-10 w-10 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                )}
              </div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {isLogin ? 'Sign in to continue your journey' : 'Join us today and get started'}
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border ${
                  isDark 
                    ? 'border-gray-700 hover:bg-gray-700/50 text-white' 
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                } transition-colors duration-200`}
              >
                <GoogleIcon className="h-5 w-5" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border ${
                  isDark 
                    ? 'border-gray-700 hover:bg-gray-700/50 text-white' 
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                } transition-colors duration-200`}
              >
                <GitHubIcon className="h-5 w-5" />
                <span>GitHub</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-white text-gray-500'}`}>
                  or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
              {!isLogin && (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PersonIcon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl ${
                        isDark 
                          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                      } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                      {...register('name', { required: !isLogin })}
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-500">Name is required</p>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EmailIcon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl ${
                        isDark 
                          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                      } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                      {...register('email', { 
                        required: !isLogin,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                      })}
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-500">Valid email is required</p>
                    )}
                  </div>

                </>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PersonIcon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl ${
                    isDark 
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  {...register('username', {
                    required: true,
                    pattern: /^[a-zA-Z0-9]+$/
                  })}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">Username must contain only letters and numbers</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl ${
                    isDark 
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  {...register('password', { required: true, minLength: 6 })}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">Password must be at least 6 characters</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loadingBtn}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition flex items-center justify-center space-x-2 disabled:opacity-70 group"
              >
                {loadingBtn ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowForwardIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className={`w-full ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                } transition text-sm mt-4 flex items-center justify-center space-x-2`}
              >
                {isLogin ? (
                  <>
                    <PersonAddIcon className="h-4 w-4" />
                    <span>Create a new account</span>
                  </>
                ) : (
                  <>
                    <LoginIcon className="h-4 w-4" />
                    <span>Sign in to existing account</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;