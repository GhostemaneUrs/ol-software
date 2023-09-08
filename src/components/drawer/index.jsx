import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDrawer } from '../../redux/slices/settings'

export const Drawer = props => {
  const { isOpen, children, onFunction } = props
  const dispatch = useDispatch()
  const { openDrawer } = useSelector(state => state.settings)
  return (
    <main
      className={
        ' fixed overflow-hidden z-10 bg-custom-gray-90 bg-opacity-25 inset-0 transform ease-in-out' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0'
          : ' transition-all delay-500 opacity-0 translate-x-full')
      }
    >
      <section
        className={
          ' w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        {children}
      </section>
      <section
        className=' w-screen h-full cursor-pointer'
        onClick={() => {
          dispatch(toggleDrawer(openDrawer))
          onFunction && onFunction()
        }}
      />
    </main>
  )
}
