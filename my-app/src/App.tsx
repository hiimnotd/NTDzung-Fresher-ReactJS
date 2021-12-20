/* eslint-disable camelcase */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import axios, { AxiosResponse } from 'axios'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import './App.css'
import arrow_down from './assets/icons/arrow_down.png'
import business from './assets/icons/business.png'
import downward from './assets/icons/downward.png'
import edit from './assets/icons/edit.png'
import home from './assets/icons/home.png'
import list from './assets/icons/list.png'
import menu from './assets/icons/menu.png'
import people from './assets/icons/people.png'
import people_grey from './assets/icons/people_grey.png'
import person_add from './assets/icons/person_add.png'
import search from './assets/icons/search.png'
import store from './assets/icons/store.png'
import upload from './assets/icons/upload.png'
import upward from './assets/icons/upward.png'
import PageButton from './components/pagebutton'
import Spacer from './components/spacer'
import { PageParm, SortType, User } from './model/user'

library.add(faStepBackward, faChevronLeft, faStepForward, faChevronRight)

const fakeAPI = 'https://jsonplaceholder.typicode.com/users'

function App () {
  const [listUser, setListUser] = useState<Array<User>>([])
  const [filterListUser, setFilterListUser] = useState<Array<User>>([])
  const [currentSort, setCurrentSort] = useState<string>('default')
  const [nameUp, setNameUp] = useState(true)
  const [emailUp, setEmailUp] = useState(true)
  const [companyUp, setCompanyUp] = useState(true)
  const [pageParam, setPageParam] = useState<PageParm>({
    page: 1,
    perPage: 5
  })

  const fileRef = useRef<HTMLInputElement>(null)

  const dataStr = useMemo<string>(() => {
    return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(listUser))
  }, [])

  const maxPage = useMemo<number>(() => {
    return Math.floor(listUser.length / pageParam.perPage)
  }, [listUser.length, pageParam.perPage])

  const cutListUser = useMemo<Array<User>>(() => {
    setFilterListUser(listUser.slice((pageParam.page - 1) * pageParam.perPage, pageParam.page * pageParam.perPage))
    return listUser.slice((pageParam.page - 1) * pageParam.perPage, pageParam.page * pageParam.perPage)
  }, [listUser, pageParam.page, pageParam.perPage])

  const sortTypes = useMemo<Array<SortType>>(() => {
    return [
      {
        class: 'name-up',
        func: (a : User, b : User) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
          return 0
        }
      },
      {
        class: 'name-down',
        func: (a : User, b : User) => {
          if (a.name < b.name) {
            return 1
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1
          }
          return 0
        }
      },
      {
        class: 'email-up',
        func: (a : User, b : User) => {
          if (a.email < b.email) {
            return -1
          }
          if (a.email.toLowerCase() > b.email.toLowerCase()) {
            return 1
          }
          return 0
        }
      },
      {
        class: 'email-down',
        func: (a : User, b : User) => {
          if (a.email < b.email) {
            return 1
          }
          if (a.email.toLowerCase() > b.email.toLowerCase()) {
            return -1
          }
          return 0
        }
      },
      {
        class: 'company-up',
        func: (a : User, b : User) => {
          if (a.company.name < b.company.name) {
            return -1
          }
          if (a.company.name.toLowerCase() > b.company.name.toLowerCase()) {
            return 1
          }
          return 0
        }
      },
      {
        class: 'company-down',
        func: (a : User, b : User) => {
          if (a.company.name < b.company.name) {
            return 1
          }
          if (a.company.name.toLowerCase() > b.company.name.toLowerCase()) {
            return -1
          }
          return 0
        }
      },
      {
        class: 'default',
        func: (a: User, b: User) => 1
      }
    ]
  }, [])

  const renderRow = useCallback(() => {
    return [...filterListUser].sort(sortTypes[sortTypes.findIndex(s => s.class === currentSort)].func).map(user => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.company.name}</td>
          <td>{user.company.name}</td>
          <td>{'Longname_Admins'}</td>
          <td style={{ textAlign: 'center' }}>
            <img alt="" src={edit}></img>
          </td>
        </tr>
      )
    })
  }, [currentSort, filterListUser, sortTypes])

  const onChangePerPage = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
    setPageParam({
      page: 1,
      perPage: Number(event.currentTarget.value)
    })
  }, [])

  const nameSortChange = useCallback(() => {
    if (nameUp) {
      setCurrentSort('name-down')
      setNameUp(false)
    } else {
      setCurrentSort('name-up')
      setNameUp(true)
    }
  }, [nameUp])

  const emailSortChange = useCallback(() => {
    if (emailUp) {
      setCurrentSort('email-down')
      setEmailUp(false)
    } else {
      setCurrentSort('email-up')
      setEmailUp(true)
    }
  }, [emailUp])

  const companySortChange = useCallback(() => {
    if (companyUp) {
      setCurrentSort('company-down')
      setCompanyUp(false)
    } else {
      setCurrentSort('company-up')
      setCompanyUp(true)
    }
  }, [companyUp])

  const onChangeText = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setFilterListUser(cutListUser.filter(item => item.email.toLowerCase().includes(event.currentTarget.value.toLowerCase())))
  }, [cutListUser])

  const onClickBackward = useCallback(() => {
    setPageParam(p => {
      return { ...p, page: p.page - 1 }
    })
  }, [])

  const onClickForward = useCallback(() => {
    setPageParam(p => {
      return { ...p, page: p.page + 1 }
    })
  }, [])

  const onClickFirstPage = useCallback(() => {
    setPageParam(p => {
      return { ...p, page: 1 }
    })
  }, [])

  const onClickLastPage = useCallback(() => {
    setPageParam(p => {
      return { ...p, page: maxPage }
    })
  }, [maxPage])

  const onUploadFile = useCallback(() => {
    fileRef.current?.click()
  }, [])

  const onGetData = useCallback((e) => {
    const fileReader = new FileReader()
    fileReader.readAsText(e.target.files[0], 'UTF-8')
    fileReader.onload = e => {
      console.log('e.target.result', e.target?.result)
    }
  }, [])

  useEffect(() => {
    axios.get(fakeAPI)
      .then((res : AxiosResponse<Array<User>>) => {
        const arrayUser: Array<User> = res.data.map(user => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company
          }
        })
        setListUser(arrayUser)
      })
      .catch(() => {
        console.log('Error')
      })
  }, [pageParam.perPage])

  return (
    <div className="wrapper">
      <div className="side-bar background-primary">
        <div className="flex-row align-center padding-vertical-20 padding-horizontal-24">
          <p className="color-white font-size-24">KPMG CSR Survey</p>
          <img alt={''} className="margin-left-48" src={menu}></img>
        </div>
        <hr />
        <div className="padding-horizontal-24">
          <div className="padding-vertical-24">
            <div className="flex-row align-center padding-10">
              <img alt={''} src={home}></img>
              <p className="color-white font-size-14 margin-left-10">Home</p>
            </div>
          </div>
          <hr />
          <div className="padding-vertical-24">
            <div className="flex-row align-center padding-10">
              <img alt={''} src={list}></img>
              <p className="color-white font-size-14 margin-left-10">Survey Admin</p>
            </div>
            <div className="flex-row align-center padding-10">
              <img alt={''} src={store}></img>
              <p className="color-white font-size-14 margin-left-10">Supplier Info</p>
            </div>
          </div>
          <hr />
          <div className="padding-vertical-24">
            <div className="flex-row align-center padding-10">
              <img alt={''} src={business}></img>
              <p className="color-white font-size-14 margin-left-10">Engagement Info</p>
            </div>
            <div className="flex-row align-center padding-10">
              <img alt={''} src={people}></img>
              <p className="color-white font-size-14 margin-left-10">User Management</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="flex-row-reverse padding-vertical-5 margin-right-16 align-center">
            <img alt={''} src={arrow_down}></img>
            <p className="font-size-14">firstname.lastname@jp.kpmg.com</p>
          </div>
        </div>
        <hr />
        <div className="container">
            <div className="flex-row breadcrumbs align-center">
              <img alt={''} src={people_grey}></img>
              <Spacer width={4}/>
              <p className="color-medium-grey margin-right-14 font-size-12 font-weight-400">User management</p>
            </div>
            <div className="flex-row">
              <div className="main-section">
                <div className="flex-row justify-space-between align-center">
                  <p className="font-size-48 font-weight-300">User Management</p>
                  <button className="button button-200 button-outline">
                    <a href={dataStr} download={'listUser.json'} className="color-primary font-size-14 font-weight-600">Download user list (CSV)</a>
                  </button>
                </div>
                <Spacer height={48}/>
                <div className="flex-row justify-space-between align-center">
                  <div className="flex-row height-40 width-400 input align-center padding-horizontal-8">
                    <img alt={''} className="icon" src={search}></img>
                    <input className="input-no-border font-size-16 font-weight-400 color-medium-grey" placeholder="Search by email" type="text" name="email" onChange={onChangeText}/>
                  </div>
                  <div className="flex-row">
                    <button className="button button-160 button-contain flex-row align-center justify-center">
                      <img alt={''} className="icon" src={person_add}></img>
                      <Spacer width={8}/>
                      <p className="color-white font-size-14 font-weight-600">Add user</p>
                    </button>
                    <Spacer width={16}/>
                    <input ref={fileRef} type={'file'} id={'button-upload'} style={{ display: 'none' }} onChange={onGetData} />
                    <button onClick={onUploadFile} className="button button-200 button-contain flex-row align-center justify-center">
                      <img alt={''} className="icon" src={upload}></img>
                      <Spacer width={8}/>
                      <p className="color-white font-size-14 font-weight-600">Upload user list (CSV)</p>
                    </button>
                  </div>
                </div>
                <Spacer height={24}/>
                <table style={{ width: '100%' }} id={'users'}>
                  <thead>
                    <tr>
                      <th>
                        <div className="flex-row align-center">
                          <p className="font-size-12 font-weight-400 color-medium-grey">Name</p>
                          <button style={{ borderWidth: '0px', backgroundColor: 'transparent' }} onClick={nameSortChange}>
                            <img alt="" src={nameUp ? downward : upward} style={{ width: 32, height: 32 }} ></img>
                          </button>
                        </div>
                      </th>
                      <th>
                        <div className="flex-row align-center">
                          <p className="font-size-12 font-weight-400 color-medium-grey">Email</p>
                          <button style={{ borderWidth: '0px', backgroundColor: 'transparent' }} onClick={emailSortChange}>
                            <img alt="" src={emailUp ? downward : upward} style={{ width: 32, height: 32 }} ></img>
                          </button>                        </div>
                      </th>
                      <th>
                        <div className="flex-row align-center">
                          <p className="font-size-12 font-weight-400 color-medium-grey">Company (JA)</p>
                          <button style={{ borderWidth: '0px', backgroundColor: 'transparent' }} onClick={companySortChange}>
                            <img alt="" src={companyUp ? downward : upward} style={{ width: 32, height: 32 }} ></img>
                          </button>
                        </div>
                      </th>
                      <th>
                       <div className="flex-row align-center">
                          <p className="font-size-12 font-weight-400 color-medium-grey">Company (EN)</p>
                          <button style={{ borderWidth: '0px', backgroundColor: 'transparent' }} onClick={companySortChange}>
                            <img alt="" src={companyUp ? downward : upward} style={{ width: 32, height: 32 }} ></img>
                          </button>
                        </div>
                      </th>
                      <th>
                       <div className="flex-row align-center">
                          <p className="font-size-12 font-weight-400 color-medium-grey">Role</p>
                          <button style={{ borderWidth: '0px', backgroundColor: 'transparent' }}>
                            <img alt="" src={downward} style={{ width: 32, height: 32 }} ></img>
                          </button>
                        </div>
                      </th>
                      <th>
                        <div className="flex-row align-center">
                          <p className="font-size-12 font-weight-400 color-medium-grey">Edit</p>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderRow()}
                  </tbody>
                </table>
                <Spacer height={24}/>
                <div className="flex-row align-center justify-end">
                    <p className="font-size-12 font-weight-400">Row per page</p>
                    <Spacer width={8}/>
                    <select className="font-size-12 font-weight-400" style={{ width: 80, height: 40, paddingLeft: 12 }} onChange={onChangePerPage} >
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                    </select>
                    <Spacer width={32}/>
                    <p className="font-size-12 font-weight-400" style={{ width: 120 }}>
                      {`1-${pageParam.perPage} of 
                      ${pageParam.perPage * pageParam.page >= listUser.length ? listUser.length : pageParam.perPage * pageParam.page}`}
                    </p>
                    <PageButton imgSrc={faStepBackward} onClick={onClickFirstPage} disable={pageParam.page === 1} />
                    <Spacer width={16}/>
                    <PageButton imgSrc={faChevronLeft} onClick={onClickBackward} disable={pageParam.page === 1} />
                    <Spacer width={4}/>
                    <PageButton imgSrc={faChevronRight} onClick={onClickForward} disable={pageParam.page === maxPage || pageParam.perPage >= listUser.length} />
                    <Spacer width={16}/>
                    <PageButton imgSrc={faStepForward} onClick={onClickLastPage} disable={pageParam.page === maxPage || pageParam.perPage >= listUser.length} />
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default App
