import React, { useEffect, useState, Fragment } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { Table } from '../../components/table'
import { Drawer } from '../../components/drawer'
import { keysToSnake } from '../../utils/keyToSnake'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDrawer } from '../../redux/slices/settings'
import { addUser, getUsers, setUser, updateUser } from '../../redux/slices/user'

export const Users = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { auth } = useSelector(state => state.auth)
  const { user, users } = useSelector(state => state.user)
  const { openDrawer } = useSelector(state => state.settings)

  const [dataUsers] = useState([
    {
      title: <>&nbsp;</>,
      className: 'py-4 w-[70px] font-semibold text-black text-base',
    },
    {
      title: 'Name',
      className: 'py-4 w-[140px] font-semibold text-black text-base',
    },
    {
      title: 'Last name',
      className: 'py-4 w-[140px] font-semibold text-black text-base',
    },
    {
      title: 'Area',
      className: 'py-4 w-[100px] font-semibold text-black text-base',
    },
    {
      title: 'Skills',
      className: 'py-4 w-[250px] font-semibold text-black text-base',
    },
    {
      title: <>&nbsp;</>,
      className: 'py-4 w-[80px] font-semibold text-black text-base',
    },
  ])

  const [filters, setFilters] = useState({
    skip: 1,
    limit: 10,
    totalRows: 0,
    totalPages: 0,
  })

  const [userForm, setUserForm] = useState({
    name: '',
    lastName: '',
    area: '',
    list: '',
    urlPhoto: '',
    rol: auth?.id,
  })

  const validateValues = Yup.object({
    name: Yup.string().required('Your name is required'),
    lastName: Yup.string().required('Your last name is required'),
    area: Yup.string().required('Your area is required'),
    list: Yup.string().required('Your technologies is required'),
  })

  const formik = useFormik({
    enableReinitialize: isLoaded,
    initialValues: userForm,
    validationSchema: validateValues,
    onSubmit: (values, { resetForm }) => {
      const snake = keysToSnake(values)
      Swal.fire({
        title: 'Are you sure?',
        text: `The user "${values.name}" ${
          values?.id !== '' && values?.id !== undefined ? 'edit' : 'added'
        } will be added to the system`,
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
          values?.id !== '' && values?.id !== undefined
            ? dispatch(updateUser(snake))
            : dispatch(addUser(snake))
          dispatch(getUsers(filters))
          setTimeout(() => {
            dispatch(toggleDrawer(openDrawer))
          }, 500)
        }
      })
      resetForm()
    },
  })

  useEffect(() => {
    setIsLoaded(true)
    setTimeout(() => {
      setIsLoaded(false)
    }, 1000)
  }, [user])

  useEffect(() => {
    dispatch(getUsers(filters))
  }, [])

  useEffect(() => {
    setUserForm({
      id: user?.id,
      name: user?.name,
      lastName: user?.lastName,
      area: user?.area,
      list: user?.list,
      rol: auth?.id,
      urlPhoto: user?.url_photo,
    })
  }, [user])

  useEffect(() => {
    setFilters({
      skip: users?.skip,
      limit: users?.limit,
      totalRows: users?.totalRows,
      totalPages: users?.totalPages,
    })
  }, [users])

  return (
    <Fragment>
      <div className='w-full px-[50px]'>
        <div className='flex items-center mb-4 justify-between'>
          <div className='w-full max-w-[500px]'>
            <input
              type='text'
              id='search'
              name='search'
              placeholder='Search'
              className='w-full border rounded-md px-4 py-2 text-base placeholder:text-sm border-light-gray outline-none'
            />
          </div>
          {auth?.rol === 'Admin' && (
            <button
              className='w-full max-w-[180px] text-white rounded-3xl bg-custom-blue-90 hover:bg-blue-700 font-bold p-3'
              onClick={() => {
                dispatch(toggleDrawer(openDrawer))
              }}
            >
              Add user
            </button>
          )}
        </div>
        <Table
          type='users'
          isPagination
          data={users.data}
          headers={dataUsers}
          pagination={filters}
        />
        <Drawer isOpen={openDrawer}>
          <div>
            <div className='w-full max-w-max pt-[24px] pl-[24px] mb-5'>
              <span
                className={`material-icons text-light-gray text-[22px] cursor-pointer hover:text-custom-red-90 hover:rounded-[20px]`}
                onClick={() => {
                  dispatch(toggleDrawer(openDrawer))
                  dispatch(
                    setUser({
                      name: '',
                      lastName: '',
                      area: '',
                      list: '',
                      url_photo: '',
                      rol: '',
                    })
                  )
                }}
              >
                close
              </span>
            </div>
          </div>
          <div className='w-full max-w-[400px] m-auto p-2'>
            <div className='mb-[16px]'>
              <span className='text-indigo text-[18px] font-semibold'>
                Personal information
              </span>
            </div>
            <div>
              <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <div className='w-full flex flex-col gap-1 mb-4'>
                  <label htmlFor='name' className='text-base font-semibold'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formik.values.name}
                    placeholder='Enter your name'
                    {...formik.getFieldProps('name')}
                    onChange={formik.handleChange}
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                      formik.touched.name && formik.errors.name
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    } outline-none`}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <span className='text-sm text-custom-red-90'>
                      {formik.errors.name}
                    </span>
                  )}
                </div>
                <div className='w-full flex flex-col gap-1 mb-4'>
                  <label htmlFor='lastName' className='text-base font-semibold'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formik.values.lastName}
                    placeholder='Enter your last name'
                    {...formik.getFieldProps('lastName')}
                    onChange={formik.handleChange}
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                      formik.touched.lastName && formik.errors.lastName
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    } outline-none`}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <span className='text-sm text-custom-red-90'>
                      {formik.errors.lastName}
                    </span>
                  )}
                </div>
                <div className='w-full flex flex-col gap-1 mb-4'>
                  <label htmlFor='area' className='text-base font-semibold'>
                    Area
                  </label>
                  <input
                    type='text'
                    id='area'
                    name='area'
                    value={formik.values.lastName}
                    placeholder='Enter your area'
                    {...formik.getFieldProps('area')}
                    onChange={formik.handleChange}
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                      formik.touched.area && formik.errors.area
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    } outline-none`}
                  />
                  {formik.touched.area && formik.errors.area && (
                    <span className='text-sm text-custom-red-90'>
                      {formik.errors.area}
                    </span>
                  )}
                </div>
                <div className='w-full flex flex-col gap-1 mb-10'>
                  <label htmlFor='list' className='text-base font-semibold'>
                    Technologies
                  </label>
                  <textarea
                    id='list'
                    rows={10}
                    placeholder='Enter your technologies'
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm  outline-none  ${
                      formik.touched.list && formik.errors.list
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    }`}
                    {...formik.getFieldProps('list')}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.list && formik.errors.list && (
                    <span className='text-sm text-custom-red-90'>
                      {formik.errors.list}
                    </span>
                  )}
                </div>
                <div className='flex gap-4 justify-center'>
                  <button
                    type='button'
                    className='w-full max-w-[180px] text-white rounded-xl bg-custom-red-90 hover:bg-red-400 font-bold p-3'
                    onClick={() => {
                      Swal.fire({
                        title: 'Are you sure?',
                        text: `It will not save the user data ${
                          formik.values.name ? formik.values.name : ''
                        }`,
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
                          dispatch(
                            setUser({
                              name: '',
                              lastName: '',
                              area: '',
                              list: '',
                              rol: auth?.id,
                            })
                          )
                          formik.setValues(userForm)
                          dispatch(toggleDrawer(openDrawer))
                        }
                      })
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='w-full max-w-[180px] text-white rounded-xl bg-custom-blue-90 hover:bg-blue-700 font-bold p-3'
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Drawer>
      </div>
    </Fragment>
  )
}
