import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FiUsers } from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'
import { LuHelpCircle } from 'react-icons/lu'
import { logout } from '../../redux/slices/auth'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { MdKeyboardArrowLeft, MdOutlineDeveloperMode } from 'react-icons/md'

export const Sidebar = () => {
  const location = useLocation()
  const urlCurrent = location.pathname
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(true)
  const [selected, setSelected] = useState(urlCurrent.split('/')[1])

  return (
    <nav
      className={`bg-custom-gray-90 p-4 h-screen ease-out duration-300 flex shadow-sidebar sticky top-0 z-50 ${
        toggle ? 'w-20' : 'w-[280px]'
      }`}
    >
      <div className='flex flex-col w-full overflow-hidden'>
        <div className='mb-4 flex gap-2 items-center'>
          <img
            alt='logo'
            src='/logo.svg'
            className='w-11 h-11 object-contain pl-1'
          />
          <p className='text-black text-lg font-semibold ml-2'>GhostemaneUrs</p>
        </div>
        <div
          className='absolute bg-custom-blue-90 rounded-[50%] flex items-center justify-center cursor-pointer top-[64px] -right-[10px]'
          style={{ transform: toggle ? 'rotate(180deg)' : 'rotate(0deg)' }}
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          <MdKeyboardArrowLeft size={25} color='white' />
        </div>
        <div className='border solid border-custom-gray-60 w-full mb-4' />
        <div className='w-full flex items-center gap-3 cursor-pointer ml-1 mb-4 min-w-[186px]'>
          <div>
            <img
              className='h-10 w-10 rounded-full'
              src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=180&h=180&q=80'
              alt=''
            />
          </div>
          <span className='text-base text-black font-semibold ml-[3px]'>
            Hi Andrés!
          </span>
        </div>
        <div className='border solid border-custom-gray-60 w-full mb-5' />
        <ul className='w-full flex flex-col items-center'>
          <li
            id='dashboard'
            className='cursor-pointer rounded-lg flex items-center w-full gap-5 mb-5 ml-4 group'
            onClick={e => {
              setSelected(e.currentTarget.id)
              navigate('/dashboard')
            }}
          >
            <div>
              <AiOutlineFundProjectionScreen
                size={32}
                className={`${
                  selected === 'dashboard'
                    ? 'text-custom-blue-90'
                    : 'text-black'
                }  group-hover:text-custom-blue-90`}
              />
            </div>
            <span
              className={`text-base ${
                selected === 'dashboard'
                  ? 'text-custom-blue-90 font-semibold'
                  : 'text-black font-medium'
              }  group-hover:text-custom-blue-90 `}
            >
              Dashboard
            </span>
          </li>
          <li
            id='projects'
            className='cursor-pointer rounded-lg flex items-center w-full gap-5 mb-5 ml-5 group'
            onClick={e => {
              setSelected(e.currentTarget.id)
              navigate('/projects')
            }}
          >
            <div>
              <MdOutlineDeveloperMode
                size={28}
                className={`${
                  selected === 'projects' ? 'text-custom-blue-90' : 'text-black'
                } group-hover:text-custom-blue-90`}
              />
            </div>
            <span
              className={`text-base ${
                selected === 'projects'
                  ? 'text-custom-blue-90 font-semibold'
                  : 'text-black font-medium'
              } group-hover:text-custom-blue-90 `}
            >
              Projects
            </span>
          </li>
          <li
            id='users'
            className='cursor-pointer rounded-lg flex items-center w-full gap-5 mb-5 ml-5 group'
            onClick={e => {
              setSelected(e.currentTarget.id)
              navigate('/users')
            }}
          >
            <div>
              <FiUsers
                size={28}
                className={`${
                  selected === 'users' ? 'text-custom-blue-90' : 'text-black'
                } group-hover:text-custom-blue-90`}
              />
            </div>
            <span
              className={`text-base ${
                selected === 'users'
                  ? 'text-custom-blue-90 font-semibold'
                  : 'text-black font-medium'
              } group-hover:text-custom-blue-90`}
            >
              Users
            </span>
          </li>
        </ul>
        <ul className='w-full mt-auto flex items-center cursor-pointer ml-[8.5px]'>
          <li
            className='flex items-center gap-5 group'
            onClick={() => {
              dispatch(logout())
            }}
          >
            <div>
              <LuHelpCircle
                size={28}
                className='text-black cursor-not-allowed'
              />
            </div>
            <span className='text-base group-hover:text-custom-blue-90 font-medium'>
              Help
            </span>
          </li>
        </ul>
      </div>
    </nav>
  )
}
