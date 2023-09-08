import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/slices/auth'
import React, { useState, useEffect } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri'
import { BsFillPersonVcardFill } from 'react-icons/bs'

export const SignIn = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  const userForm = {
    user: '',
    password: '',
    remember: false,
  }
  const validateValues = Yup.object({
    user: Yup.string().required('Tu usuario es requerido'),
    password: Yup.string().required('Tu contraseña es requerida'),
    remember: Yup.boolean(),
  })

  useEffect(() => {
    setIsLoaded(true)
    setTimeout(() => {
      setIsLoaded(false)
    }, 1000)
  }, [])

  const formik = useFormik({
    enableReinitialize: isLoaded,
    initialValues: userForm,
    validationSchema: validateValues,
    onSubmit: (values, { resetForm }) => {
      dispatch(signIn(values))
      resetForm()
    },
  })

  return (
    <div className='w-full flex flex-col items-center justify-center h-full lg:flex-row'>
      <div className='w-full flex items-center justify-center px-4'>
        <div className='flex flex-col gap-5 w-full max-w-[500px]'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-4xl font-bold'>Sign In</h1>
            <p className='border-light-gray text-sm'>
              Don&apos;t have an account?{' '}
              <span className='text-custom-blue-90 font-semibold cursor-pointer hover:underline'>
                Sign up
              </span>
            </p>
          </div>
          <form
            noValidate
            autoComplete='off'
            onSubmit={formik.handleSubmit}
            className='w-full gap-1 flex flex-col'
          >
            <div className='w-full flex flex-col gap-1 mb-4 relative'>
              <label htmlFor='user' className='text-base font-bold'>
                User
              </label>
              <input
                type='text'
                id='user'
                name='user'
                value={formik.values.user}
                placeholder='Enter your user'
                {...formik.getFieldProps('user')}
                onChange={formik.handleChange}
                className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                  formik.touched.user && formik.errors.user
                    ? 'border-custom-red-90'
                    : 'border-light-gray'
                }`}
              />
              <BsFillPersonVcardFill
                className={`w-[20px] h-[20px] absolute top-[70%] right-4 transform -translate-y-1/2 border-light-gray ${
                  formik.touched.user && formik.errors.user && 'top-[50%]'
                }`}
              />
              {formik.touched.user && formik.errors.user && (
                <span className='text-sm text-custom-red-90'>
                  {formik.errors.user}
                </span>
              )}
            </div>
            <div className='w-full flex flex-col gap-1 mb-4 relative'>
              <label htmlFor='user' className='text-base font-bold'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                {...formik.getFieldProps('password')}
                value={formik.values.password}
                placeholder='*****************'
                onChange={formik.handleChange}
                className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                  formik.touched.password && formik.errors.password
                    ? 'border-custom-red-90'
                    : 'border-light-gray'
                }`}
              />
              <RiLockPasswordLine
                className={`w-[20px] h-[20px] absolute right-4 transform -translate-y-1/2 border-light-gray ${
                  formik.touched.password &&
                  formik.errors.password &&
                  'top-[50%]'
                } top-[70%]`}
              />
              {formik.touched.password && formik.errors.password && (
                <span className='text-sm text-custom-red-90'>
                  {formik.errors.password}
                </span>
              )}
            </div>
            <div className='flex justify-between mb-7 w-full'>
              <div className='flex items-center gap-3'>
                <input
                  id='remember'
                  type='checkbox'
                  {...formik.getFieldProps('remember')}
                  checked={formik.values.remember}
                  value={String(formik.values.remember)}
                  onChange={e => {
                    formik.handleChange(e)
                  }}
                  className='w-4 h-4 bg-slate-400'
                />
                <label
                  htmlFor='remember'
                  className='text-sm font-semibold border-light-gray'
                >
                  Remember
                </label>
              </div>
              <div>
                <span className='text-sm text-custom-blue-90 hover:underline cursor-pointer font-semibold'>
                  Forgot your password?{' '}
                </span>
              </div>
            </div>
            <button
              type='submit'
              className='text-white rounded-3xl bg-custom-blue-90 hover:bg-blue-700 font-bold p-3'
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div className='bg-radial-gradient-signin w-full h-full hidden lg:block' />
    </div>
  )
}
