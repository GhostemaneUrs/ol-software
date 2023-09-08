import React, { Fragment } from 'react'
import Swal from 'sweetalert2'
import { logout } from '../../redux/slices/auth'
import { IoMdNotifications } from 'react-icons/io'
import { MdPowerSettingsNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { viewNotifications } from '../../redux/slices/user'

export const Header = () => {
  const dispatch = useDispatch()
  const { notifications } = useSelector(state => state.user)

  return (
    <Fragment>
      <div className='flex justify-end items-center pb-[20px] pt-5 gap-4 px-[64px] mx-auto relative z-10'>
        <div className='relative'>
          <IoMdNotifications
            size={33}
            className='cursor-pointer text-black hover:text-custom-blue-90'
            onClick={() => {
              dispatch(viewNotifications())
            }}
          />
          {notifications?.length > 0 && (
            <div className='bg-custom-blue-90 rounded-full w-3 h-3 absolute top-[5px] right-[1px]' />
          )}
        </div>

        <MdPowerSettingsNew
          size={33}
          className='cursor-pointer text-black hover:text-custom-blue-90'
          onClick={() => {
            Swal.fire({
              icon: 'question',
              title: 'Are you sure you want to go out?',
              text: 'You will be logged out of the system',
              showCloseButton: true,
              confirmButtonText: 'Sign out',
              customClass: {
                title: 'error-title',
                htmlContainer: 'error-content',
                closeButton: 'error-close-button',
                confirmButton: 'error-question-button',
              },
            }).then(result => {
              if (result.isConfirmed) {
                dispatch(logout())
              }
            })
          }}
        />
      </div>
      <div className='border solid border-custom-gray-60 mb-3' />
    </Fragment>
  )
}
