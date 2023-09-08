import Swal from 'sweetalert2'
import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDrawer } from '../../redux/slices/settings'
import {
  getProjectById,
  getProjects,
  removeProject,
} from '../../redux/slices/project'
import { getUserById, getUsers, removeUser } from '../../redux/slices/user'
import { Menu, MenuList, MenuItem, MenuHandler } from '@material-tailwind/react'

export const Table = props => {
  const {
    data,
    type,
    headers,
    pagination,
    isAccordion,
    isPagination,
    uniqueAccordion,
  } = props

  const [unique, setUnique] = useState(null)

  const rowProps = {
    unique,
    setUnique,
    uniqueAccordion,
  }

  return (
    <Fragment>
      <table
        className={`${
          isAccordion &&
          'fold-table overflow-hidden border solid border-light-gray rounded-tr-[24px] rounded-tl-[24px]'
        }  ${
          isPagination &&
          'fold-table overflow-hidden border solid border-light-gray rounded-tr-[24px] rounded-tl-[24px]'
        }`}
      >
        <thead>
          <tr>
            {headers?.length > 0 &&
              headers?.map((item, index) => {
                return (
                  <th className={`${item?.className}`} key={`headers ${index}`}>
                    {item?.title || item?.name}
                  </th>
                )
              })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((item, index) => {
              return (
                <Fragment key={index}>
                  {type === 'users' && (
                    <RowTableUser item={item} pagination={pagination} />
                  )}
                  {type === 'projects' && (
                    <RowTableProjects
                      item={item}
                      {...rowProps}
                      index={index}
                      pagination={pagination}
                    />
                  )}
                </Fragment>
              )
            })}
        </tbody>
      </table>
      {isPagination && <Pagination type={type} pagination={pagination} />}
    </Fragment>
  )
}

const RowTableUser = ({ item, pagination }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const { openDrawer } = useSelector(state => state.settings)

  const handleEditUser = item => {
    dispatch(getUserById({ id: item }))
    dispatch(toggleDrawer(openDrawer))
  }

  const handleRemoveUser = item => {
    dispatch(removeUser({ id: item, filters: pagination }))
  }

  return (
    <>
      <tr key={'row-1'} className='view bg-white hover:bg-custom-gray-90'>
        <td className={`text-black text-base py-1 text-center`}>
          <span className='material-icons'>person</span>
        </td>
        <td className='text-black text-base py-1'>{item.name}</td>
        <td className='text-black text-base py-1'>{item.lastName}</td>
        <td className='text-black text-base py-1'>{item.area}</td>
        <td className='text-black text-base py-1'>
          {item?.list.replace(/\|/g, ', ')}
        </td>
        {auth?.rol === 'Admin' && (
          <td
            className='text-center pr-5'
            onClick={() => {
              setIsOpenMenu(!isOpenMenu)
            }}
          >
            <Menu open={isOpenMenu} handler={() => setIsOpenMenu(!isOpenMenu)}>
              <MenuHandler>
                <span className='material-icons text-black text-2xl py-1'>
                  list
                </span>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: `The user "${item.name}" will be edited`,
                      icon: 'warning',
                      showDenyButton: true,
                      confirmButtonText: 'Yes, continue',
                      denyButtonText: 'Cancel',
                      customClass: {
                        title: 'error-title',
                        htmlContainer: 'error-content',
                        denyButton: 'error-deny-button',
                        confirmButton: 'error-question-button',
                      },
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleEditUser(item.id)
                      }
                    })
                  }}
                >
                  <span className='cursor-pointer'>Edit</span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: `The user "${item.name}" will be removed`,
                      icon: 'warning',
                      showDenyButton: true,
                      confirmButtonText: 'Yes, continue',
                      denyButtonText: 'Cancel',
                      customClass: {
                        title: 'error-title',
                        htmlContainer: 'error-content',
                        denyButton: 'error-deny-button',
                        confirmButton: 'error-question-button',
                      },
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleRemoveUser(item.id)
                      }
                    })
                  }}
                >
                  <span className='cursor-pointer'>Remove</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </td>
        )}
      </tr>
    </>
  )
}

const RowTableProjects = props => {
  const dispatch = useDispatch()
  const { item, pagination, index } = props
  const { auth } = useSelector(state => state.auth)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenCollapse, setIsOpenCollapse] = useState(false)
  const { openDrawer } = useSelector(state => state.settings)

  const handleEditProject = item => {
    dispatch(getProjectById({ id: item }))
    dispatch(toggleDrawer(openDrawer))
  }

  const handleRemoveProject = item => {
    dispatch(removeProject({ id: item, filters: pagination }))
  }

  const handleIsExpansible = () => {
    if (isOpenCollapse) {
      setIsOpenCollapse(false)
      if (props?.uniqueAccordion) props?.setUnique(null)
    } else {
      setIsOpenCollapse(true)
      if (props?.uniqueAccordion) props?.setUnique(index)
    }
  }

  useEffect(() => {
    if (props?.uniqueAccordion) {
      if (props?.unique === index) {
        setIsOpenCollapse(true)
      } else {
        setIsOpenCollapse(false)
      }
    }
  }, [props?.unique])

  return (
    <>
      <tr key={'row-1'} className='view bg-white'>
        <td
          className='text-center w-[10px]'
          onClick={() => {
            handleIsExpansible()
          }}
        >
          <span
            className={`material-icons text-light-gray text-[30px] cursor-pointer hover:bg-indigo-50 hover:rounded-[20px] ${
              isOpenCollapse === false && 'rotate-180'
            }`}
          >
            expand_less
          </span>
        </td>
        <td>
          <span className='material-icons p-1'>task</span>
        </td>
        <td className='text-black text-base text-start'>{item?.client}</td>
        <td className='text-black text-base text-start'>{item?.projectName}</td>
        <td className='text-black text-base text-center'>{item?.reportNc}</td>
        <td className='text-black text-base text-center'>
          {item?.deployCount}
        </td>
        <td className='text-black text-base text-center'>
          {item?.errorsCount}
        </td>
        <td className='text-black text-base text-center'>
          {item?.warningCount}
        </td>
        <td className='text-black text-base text-center'>{item?.status}</td>

        {auth?.rol === 'Admin' && (
          <td
            className='text-center'
            onClick={() => {
              setIsOpenMenu(!isOpenMenu)
            }}
          >
            <Menu open={isOpenMenu} handler={() => setIsOpenMenu(!isOpenMenu)}>
              <MenuHandler>
                <span className='material-icons text-black text-2xl py-1'>
                  list
                </span>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: `The project "${item.projectName}" will be edited`,
                      icon: 'warning',
                      showDenyButton: true,
                      confirmButtonText: 'Yes, continue',
                      denyButtonText: 'Cancel',
                      customClass: {
                        title: 'error-title',
                        htmlContainer: 'error-content',
                        denyButton: 'error-deny-button',
                        confirmButton: 'error-question-button',
                      },
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleEditProject(item.id)
                      }
                    })
                  }}
                >
                  <span className='cursor-pointer'>Edit</span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: `The project "${item.name}" will be removed`,
                      icon: 'warning',
                      showDenyButton: true,
                      confirmButtonText: 'Yes, continue',
                      denyButtonText: 'Cancel',
                      customClass: {
                        title: 'error-title',
                        htmlContainer: 'error-content',
                        denyButton: 'error-deny-button',
                        confirmButton: 'error-question-button',
                      },
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleRemoveProject(item.id)
                      }
                    })
                  }}
                >
                  <span className='cursor-pointer'>Remove</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </td>
        )}
      </tr>

      {/* Accordion */}
      {isOpenCollapse === true && (
        <tr
          key={'row-2'}
          className={`${isOpenCollapse && 'open'} w-full bg-white`}
        >
          <td colSpan={12}>
            <div className='fold-content'>
              <div className='flex py-[3px] px-[4rem] gap-10'>
                <div className='flex flex-col max-w-[800px] pl-[50px] 2xl:pl-[68px]'>
                  <span className='text-black text-base font-semibold'>
                    Develops
                  </span>
                  <span
                    key={index}
                    className='text-black text-base text-[14px] py-[3px]'
                  >
                    {item?.developers.split('|').join(', ')}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-black text-base font-semibold'>
                    Frontend Technologies
                  </span>
                  <span
                    key={index}
                    className='text-black text-base text-[14px] py-[3px]'
                  >
                    {item?.frontendTecnology.split('|').join(', ')}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-black text-base font-semibold'>
                    Backend Technologies
                  </span>
                  <span
                    key={index}
                    className='text-black text-base text-[14px] py-[3px]'
                  >
                    {item?.backendTecnology.split('|').join(', ')}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-black text-base font-semibold'>
                    Databases
                  </span>
                  <span
                    key={index}
                    className='text-black text-base text-[14px] py-[3px]'
                  >
                    {item?.databases.split('|').join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

const Pagination = props => {
  const dispatch = useDispatch()
  const { type, pagination } = props
  return (
    <div className='bg-white border-b-[1px] border-r-[1px] border-l-[1px] solid border-[#bcc9d9] rounded-bl-[24px] rounded-br-[24px] w-full py-2 pr-[25px]'>
      <ul className='flex items-center justify-end gap-[10px]'>
        <li>
          <span className='text-black text-[14px]'>
            {pagination?.skip} / {pagination.totalPages ?? '1'} pages
          </span>
        </li>
        <li
          onClick={() => {
            type === 'users' && dispatch(getUsers({ skip: 1, limit: 10 }))
            type === 'projects' && dispatch(getProjects({ skip: 1, limit: 10 }))
          }}
          className='flex items-center cursor-pointer group'
        >
          <span className='material-icons text-black group-hover:text-custom-blue-90'>
            skip_previous
          </span>
        </li>
        <li>
          <a
            onClick={() => {
              if (pagination?.skip > 1) {
                type === 'users' &&
                  dispatch(
                    getUsers({ ...pagination, skip: pagination?.skip - 1 })
                  )
                type === 'projects' &&
                  dispatch(
                    getProjects({ ...pagination, skip: pagination?.skip - 1 })
                  )
              }
            }}
            className='group flex items-center cursor-pointer'
          >
            <span className='material-icons text-black group-hover:text-custom-blue-90'>
              navigate_before
            </span>
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              if (pagination?.skip < pagination?.totalPages) {
                type === 'users' &&
                  dispatch(
                    getUsers({ ...pagination, skip: pagination?.skip + 1 })
                  )
                type === 'projects' &&
                  dispatch(
                    getProjects({ ...pagination, skip: pagination?.skip + 1 })
                  )
              }
            }}
            className='flex items-center cursor-pointer group'
          >
            <span className='material-icons text-black group-hover:text-custom-blue-90'>
              navigate_next
            </span>
          </a>
        </li>
        <li
          onClick={() => {
            type === 'users' &&
              dispatch(
                getUsers({ ...pagination, skip: pagination?.totalPages })
              )
            type === 'projects' &&
              dispatch(
                getProjects({ ...pagination, skip: pagination?.totalPages })
              )
          }}
          className='flex items-center cursor-pointer group'
        >
          <span className='material-icons text-black group-hover:text-custom-blue-90'>
            skip_next
          </span>
        </li>
      </ul>
    </div>
  )
}
