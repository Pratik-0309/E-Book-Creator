import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Mail , Lock , User, BookOpen} from 'Lucide-react'
import toast from 'react-hot-toast'

import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath'


function SignupPage() {
  const [formData,setFormData] = useState({name: "",email: "",password: ""})
  const [isLoading, setIsLoading] = useState(false)
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({ ...formData,[e.target.name]: e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setIsLoading(true);
    try{
     const responce = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData)

      await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
      });

      // Fetch profile to get user detail
      const profileResponce = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE)
      const user = profileResponce.data.user || profileResponce.data
      login(user);
      toast.success("Account Created Successfully")
      navigate("/")
    }catch(error){
      toast.error(error.response?.data?.message || "Signup failed. Please try again.")
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex h-16 w-16 items-center justify-center 
            bg-violet-500 rounded-xl mb-4 shadow-xl"
          >
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="text-gray-600 mt-2">
            Start your journey of creating amazing eBooks today.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-2xl p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
             <InputField
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" isLoading={isLoading} className="w-full mt-8">
              Create Account    
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-600 hover:text-violet-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage