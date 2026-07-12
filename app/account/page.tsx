'use client';
import EditProfileModal from '../../components/account/EditProfileModal';

import ChangePasswordModal from '../../components/account/ChangePasswordModal';

import DeleteAccountModal from '../../components/account/DeleteAccountModal';

import { useAuthStore } from '@/store';
import { useState } from 'react';
import {
  User,
  Shield,
  Pencil,
  Lock,
  Trash2,
} from 'lucide-react';

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>(
    'profile'
  );

  // Later this will come from Zustand
 

  const [editOpen, setEditOpen] = useState(false);

const [passwordOpen, setPasswordOpen] = useState(false);

const [deleteOpen, setDeleteOpen] = useState(false);

const user = useAuthStore((state)=> state.user);
if(!user) {
    return <div> Loading...</div>;
}

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">

      {/* Heading */}

      <h1 className="text-4xl font-black text-gray-900">
        My Account
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your profile information and security settings.
      </p>

      {/* Main Card */}

      <div className="mt-8 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

        {/* Tabs */}

        <div className="flex border-b">

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-8 py-4 font-semibold transition
            ${
              activeTab === 'profile'
                ? 'border-b-2 border-[#970747] text-[#970747] bg-pink-50'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <User size={18} />
            Profile
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-8 py-4 font-semibold transition
            ${
              activeTab === 'security'
                ? 'border-b-2 border-[#970747] text-[#970747] bg-pink-50'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Shield size={18} />
            Security
          </button>

        </div>

        {/* PROFILE */}

        {activeTab === 'profile' && (

          <div className="p-8">

            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                Profile Information
              </h2>

              <button
              onClick={()=> setEditOpen(true)}
                className="flex items-center gap-2 bg-pink-50 text-[#970747] px-5 py-2 rounded-lg hover:bg-pink-100"
              >
                <Pencil size={16} />
                Edit Profile
              </button>

            </div>

            <div className="mt-10 space-y-7">

              <div className="grid grid-cols-2">

                <span className="font-semibold text-gray-700">
                  Full Name
                </span>

                <span>{user.name.firstname} {user.name.lastname}</span>

              </div>

              <div className="grid grid-cols-2">

                <span className="font-semibold text-gray-700">
                  Email
                </span>

                <span>{user.email}</span>

              </div>

              <div className="grid grid-cols-2">

               {/*  <span className="font-semibold text-gray-700">
                  Phone Number
                </span> */}

                <span>{user.phone}</span>

              </div>

            </div>

          </div>

        )}

        {/* SECURITY */}

{activeTab === 'security' && (
  <div className="p-8">
    <h2 className="mb-8 text-2xl font-bold">
      Security
    </h2>

    <div className="flex flex-wrap gap-4">

      {/* Update Password Button */}
      <button
        onClick={() => setPasswordOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-blue-50 px-5 py-3 text-blue-700 transition hover:bg-blue-100"
      >
        <Lock size={16} />
        Update Password
      </button>

      {/* Delete Account Button */}
      <button
        onClick={() => setDeleteOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-red-50 px-5 py-3 text-red-600 transition hover:bg-red-100"
      >
        <Trash2 size={16} />
        Delete Account
      </button>

    </div>
  </div>
)}

       

      </div>

      <EditProfileModal
  open={editOpen}
  user={user}
  onClose={() => setEditOpen(false)}
/>

     

<ChangePasswordModal
  open={passwordOpen}
  onClose={() => setPasswordOpen(false)}
/>

<DeleteAccountModal
  open={deleteOpen}
  onClose={() => setDeleteOpen(false)}
/>

    </div>
  );
}