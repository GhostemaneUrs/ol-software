import React, { useEffect, useState, Fragment } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { Table } from '../../components/table'
import { Drawer } from '../../components/drawer'
import { useDispatch, useSelector } from 'react-redux'
import { keysToSnake } from '../../utils/keyToSnake'
import { toggleDrawer } from '../../redux/slices/settings'
import {
  addProject,
  getProjects,
  setProject,
  updateProject,
} from '../../redux/slices/project'

export const Projects = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { auth } = useSelector(state => state.auth)
  const { openDrawer } = useSelector(state => state.settings)
  const { project, projects } = useSelector(state => state.project)

  const [dataProjects] = useState([
    {
      title: <>&nbsp;</>,
      className: 'py-4 w-[70px] font-semibold text-black text-base',
    },
    {
      title: <>&nbsp;</>,
      className: 'py-4 w-[70px] font-semibold text-black text-base',
    },
    {
      title: 'Client',
      className: 'py-4 w-[190px] font-semibold text-black text-base',
    },
    {
      title: 'Project Name',
      className: 'py-4 w-[160px] font-semibold text-black text-base',
    },
    {
      title: 'Reports',
      className:
        'py-4 w-[70px] !text-center font-semibold text-black text-base',
    },
    {
      title: 'Deploys',
      className:
        'py-4 w-[70px] !text-center font-semibold text-black text-base',
    },
    {
      title: 'Errors',
      className:
        'py-4 w-[60px] !text-center font-semibold text-black text-base',
    },
    {
      title: 'Warnings',
      className:
        'py-4 w-[90px]  !text-center font-semibold text-black text-base',
    },
    {
      title: 'Status',
      className:
        'py-4  !text-center w-[60px] font-semibold text-black text-base',
    },
    {
      title: <>&nbsp;</>,
      className: 'py-4 w-[100px] font-semibold text-black text-base',
    },
  ])

  const [filters, setFilters] = useState({
    skip: 1,
    limit: 10,
    totalRows: 0,
    totalPages: 0,
  })

  const [projectForm, setProjectForm] = useState({
    id: '',
    projectName: '',
    repoUrl: '',
    client: '',
    developers: '',
    cd: false,
    frontendTecnology: '',
    backendTecnology: '',
    databases: '',
    errorsCount: 0,
    warningCount: 0,
    deployCount: 0,
    percentageCompletion: 0,
    reportNc: 0,
    status: '',
  })

  const validateValues = Yup.object({
    client: Yup.string().required('The client is required'),
    ci: Yup.boolean(),
    cd: Yup.boolean(),
    repoUrl: Yup.string().required('The url repository is required'),
    developers: Yup.string().required('The developers is required'),
    databases: Yup.string().required('The databases is required'),
    projectName: Yup.string().required('The project name is required'),
    backendTecnology: Yup.string().required(
      'The backend technologies is required'
    ),
    frontendTecnology: Yup.string().required(
      'The frontend technologies is required'
    ),
  })

  const formik = useFormik({
    enableReinitialize: isLoaded,
    initialValues: projectForm,
    validationSchema: validateValues,
    onSubmit: (values, { resetForm }) => {
      const completedValues = {
        ...values,
        errorsCount: 0,
        deployCount: 0,
        warningCount: 0,
        percentageCompletion: 0,
        reportNc: 0,
        status: 'En Desarrollo',
      }
      Swal.fire({
        title: 'Are you sure?',
        text: `The project "${values.projectName}" ${
          values?.id !== '' ? 'edit' : 'added'
        } will be ${values?.id !== '' ? 'edit' : 'added'} to the system`,
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
          values?.id !== ''
            ? dispatch(updateProject(keysToSnake(values)))
            : dispatch(addProject(keysToSnake(completedValues)))
          dispatch(getProjects(filters))
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
  }, [project, openDrawer])

  useEffect(() => {
    dispatch(getProjects(filters))
  }, [])

  useEffect(() => {
    setProjectForm({
      id: project?.id,
      projectName: project?.projectName,
      repoUrl: project?.repoUrl,
      client: project?.client,
      developers: project?.developers,
      cd: project?.cd,
      frontendTecnology: project?.frontendTecnology,
      backendTecnology: project?.backendTecnology,
      databases: project?.databases,
      errorsCount: project?.errorsCount,
      warningCount: project?.warningCount,
      deployCount: project?.deployCount,
      percentageCompletion: project?.percentageCompletion,
      reportNc: project?.reportNc,
      status: project?.status,
    })
  }, [project])

  useEffect(() => {
    setFilters({
      skip: projects?.skip,
      limit: projects?.limit,
      totalRows: projects?.totalRows,
      totalPages: projects?.totalPages,
    })
  }, [projects])

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
                dispatch(toggleDrawer())
              }}
            >
              Add projects
            </button>
          )}
        </div>
        <Table
          type='projects'
          isPagination
          data={projects.data}
          pagination={filters}
          headers={dataProjects}
        />
        <Drawer isOpen={openDrawer} c>
          <div>
            <div className='w-full max-w-max pt-[20px] pl-[24px] mb-3'>
              <span
                className={`material-icons text-light-gray text-[22px] cursor-pointer hover:text-custom-red-90 hover:rounded-[20px]`}
                onClick={() => {
                  dispatch(toggleDrawer(openDrawer))
                  dispatch(
                    setProject({
                      client: '',
                      ci: false,
                      cd: false,
                      repoUrl: '',
                      developers: '',
                      databases: '',
                      projectName: '',
                      backendTecnology: '',
                      frontendTecnology: '',
                    })
                  )
                  formik.setValues(projectForm)
                }}
              >
                close
              </span>
            </div>
          </div>
          <div className='w-full max-w-[400px] m-auto p-2'>
            {/* <div className='mb-2'>
              <span className='text-indigo text-[18px] font-semibold'>
                Project information
              </span>
            </div> */}
            <div className='max-h-[900px] isScroll px-4'>
              <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <div className='w-full flex flex-col gap-1 mb-4'>
                  <label htmlFor='client' className='text-base font-semibold'>
                    Client
                  </label>
                  <input
                    type='text'
                    id='client'
                    name='client'
                    value={formik.values.client}
                    placeholder='Enter your client'
                    {...formik.getFieldProps('client')}
                    onChange={formik.handleChange}
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                      formik.touched.client && formik.errors.client
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    } outline-none`}
                  />
                  {formik.touched.client && formik.errors.client && (
                    <span className='text-sm text-custom-red-90'>
                      {formik.errors.client}
                    </span>
                  )}
                </div>
                <div className='w-full flex flex-col gap-1 mb-4'>
                  <label
                    htmlFor='projectName'
                    className='text-base font-semibold'
                  >
                    Project Name
                  </label>
                  <input
                    type='text'
                    id='projectName'
                    name='projectName'
                    value={formik.values.projectName}
                    placeholder='Enter your last name'
                    {...formik.getFieldProps('projectName')}
                    onChange={formik.handleChange}
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                      formik.touched.projectName && formik.errors.projectName
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    } outline-none`}
                  />
                  {formik.touched.projectName && formik.errors.projectName && (
                    <span className='text-sm text-custom-red-90'>
                      {formik.errors.projectName}
                    </span>
                  )}
                </div>
                <div className='w-full flex flex-col gap-1 mb-4'>
                  <label htmlFor='repoUrl' className='text-base font-semibold'>
                    Url repository
                  </label>
                  <input
                    type='text'
                    id='repoUrl'
                    name='repoUrl'
                    value={formik.values.lastName}
                    placeholder='Enter your url repository'
                    {...formik.getFieldProps('repoUrl')}
                    onChange={formik.handleChange}
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                      formik.touched.repoUrl && formik.errors.repoUrl
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    } outline-none`}
                  />
                  {formik.touched.repoUrl && formik.errors.repoUrl && (
                    <span className='text-sm text-custom-red-90'>
                      {formik.errors.repoUrl}
                    </span>
                  )}
                </div>
                <div className='w-full flex flex-col gap-1 mb-4'>
                  <label
                    htmlFor='frontendTecnology'
                    className='text-base font-semibold'
                  >
                    Frontend technologies
                  </label>
                  <input
                    type='text'
                    id='frontendTecnology'
                    name='frontendTecnology'
                    value={formik.values.frontendTecnology}
                    placeholder='Enter your frontend technologies'
                    {...formik.getFieldProps('frontendTecnology')}
                    onChange={formik.handleChange}
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                      formik.touched.frontendTecnology &&
                      formik.errors.frontendTecnology
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    } outline-none`}
                  />
                  {formik.touched.frontendTecnology &&
                    formik.errors.frontendTecnology && (
                      <span className='text-sm text-custom-red-90'>
                        {formik.errors.frontendTecnology}
                      </span>
                    )}
                </div>
                <div className='w-full flex flex-col gap-1 mb-4'>
                  <label
                    htmlFor='backendTecnology'
                    className='text-base font-semibold'
                  >
                    Backend technologies
                  </label>
                  <input
                    type='text'
                    id='backendTecnology'
                    name='backendTecnology'
                    value={formik.values.backendTecnology}
                    placeholder='Enter your frontend technologies'
                    {...formik.getFieldProps('backendTecnology')}
                    onChange={formik.handleChange}
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                      formik.touched.backendTecnology &&
                      formik.errors.backendTecnology
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    } outline-none`}
                  />
                  {formik.touched.backendTecnology &&
                    formik.errors.backendTecnology && (
                      <span className='text-sm text-custom-red-90'>
                        {formik.errors.backendTecnology}
                      </span>
                    )}
                </div>
                <div className='w-full flex flex-col gap-1 mb-4'>
                  <label
                    htmlFor='databases'
                    className='text-base font-semibold'
                  >
                    Databases
                  </label>
                  <input
                    type='text'
                    id='databases'
                    name='databases'
                    value={formik.values.databases}
                    placeholder='Enter your databases'
                    {...formik.getFieldProps('databases')}
                    onChange={formik.handleChange}
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm ${
                      formik.touched.databases && formik.errors.databases
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    } outline-none`}
                  />
                  {formik.touched.databases && formik.errors.databases && (
                    <span className='text-sm text-custom-red-90'>
                      {formik.errors.databases}
                    </span>
                  )}
                </div>
                <div className='w-full flex flex-col gap-1 mb-10'>
                  <label
                    htmlFor='developers'
                    className='text-base font-semibold'
                  >
                    Developers
                  </label>
                  <textarea
                    id='developers'
                    rows={5}
                    placeholder='Enter your technologies'
                    className={`w-full border  rounded-md px-4 py-2 text-base placeholder:text-sm  outline-none  ${
                      formik.touched.developers && formik.errors.developers
                        ? 'border-custom-red-90'
                        : 'border-light-gray'
                    }`}
                    {...formik.getFieldProps('developers')}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.developers && formik.errors.developers && (
                    <span className='text-sm text-custom-red-90'>
                      {formik.errors.developers}
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
                        text: `It will not save the project data ${
                          formik.values.projectName
                            ? formik.values.projectName
                            : ''
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
                            setProject({
                              client: '',
                              ci: false,
                              cd: false,
                              repoUrl: '',
                              developers: '',
                              databases: '',
                              projectName: '',
                              backendTecnology: '',
                              frontendTecnology: '',
                            })
                          )
                          formik.setValues(projectForm)
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
