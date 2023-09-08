import React from 'react'
import { ClipLoader } from 'react-spinners'

export const Loading = props => {
  const { state } = props

  return (
    <>
      {state && (
        <div className='bg-[#FFFFFF] opacity-80 h-full w-full absolute z-[60]'>
          <div className='flex justify-center items-center w-full h-full'>
            <div className='absolute'>
              <ClipLoader color='#6e37ee' loading={state} size='170px' />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
