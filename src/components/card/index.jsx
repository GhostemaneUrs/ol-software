import React from 'react'

export const Card = ({ item }) => {
  return (
    <div className='bg-white shadow-md p-6 rounded-lg w-full border solid border-custom-gray-60'>
      <div className='w-full flex flex-col'>
        <div className='w-full gap-5 flex justify-between items-center'>
          <span className='text-custom-gray-50 text-lg uppercase'>
            {item?.name}
          </span>
          <div
            className={`flex justify-center items-center  rounded-full h-[40px] w-[40px] ${item.color}`}
          >
            <span className='material-icons text-2xl text-white'>
              {item?.icon}
            </span>
          </div>
        </div>
        <span className='text-black text-3xl uppercase font-bold'>
          {item?.value}
        </span>
      </div>
    </div>
  )
}
