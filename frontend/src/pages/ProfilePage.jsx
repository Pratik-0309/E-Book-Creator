import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { User, Mail } from "Lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

function ProfilePage() {
  const { user, updatedUser, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        name: formData.name,
      });

      const updatedUserObject = response.data.user;

      // 1. Synchronize AuthContext (Global state)
      updatedUser(updatedUserObject);

      // 2. Synchronize Local State for instant feedback in the input field
      setFormData({ name: updatedUserObject.name, email: updatedUserObject.email });

      toast.success("Profile Updated Successfully.");

    } catch (error) {
      console.error("Profile update error:", error);

      // Check if the backend returned a non-200 status but the user object (database success)
      const userFromError = error.response?.data?.user;

      if (userFromError) {
        // If user object is present, treat as success (backend status code issue)
        updatedUser(userFromError);
        setFormData({ name: userFromError.name, email: userFromError.email });
        toast.success("Profile Updated Successfully (Backend Status Warning).");
      } else {
        // Genuine failure
        toast.error(error.response?.data?.message || "Failed to Update profile.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <>
        <div>Loading Profile .....</div>
      </>
    );
  }

  return (
    <DashboardLayout activeMenu="profile">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile</h1>
        <p className="text-slate-600 mb-8">Manage your account details.</p>

        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="name"
                type="text"
                icon={User}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                icon={Mail}
                value={formData.email}
                disabled
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full sm:w-auto"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProfilePage;
