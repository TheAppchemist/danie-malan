import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import ParticipantsService from 'src/services/participants'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import Scanner from './Scanner'
import { getDoc } from 'firebase/firestore'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      name: 'Melvin',
      location: 'gauteng',
      email: 'melvin@mlab.co.za',
      checkedIn: false,
    },
  ]

  const [users, setUsers] = useState()
  const [stats, setStats] = useState()
  const [loggedIn, setLoggedIn] = useState()
  const [scan, setScan] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const auth = getAuth()

    auth.onAuthStateChanged(state => {
      if (state) {
        ParticipantsService.isAdmin(state.uid).then(isAdmin => {
          if (isAdmin) {
            setLoggedIn(true)
          } else {
            navigate('/login')
          }
        })
        
      } else {
        navigate('/login')
      }
    })
  }, [])

  const getUsers = () => {
    ParticipantsService.participants().then(allUsers => {
      setUsers(allUsers)
      const userStats = {
        kzn: {
          registered: 0,
          checkedIn: 0
        },
        gauteng: {
          registered: 0,
          checkedIn: 0
        },
        limpopo: {
          registered: 0,
          checkedIn: 0
        },
        'northern-cape': {
          registered: 0,
          checkedIn: 0
        }
      }

      for (let user of allUsers) {
        userStats[user.location].registered += 1

        if (user.checkedIn) {
          userStats[user.location].checkedIn += 1
        }
      }

      setStats(userStats)
    })
  }

  useEffect(() => {
    if (loggedIn) {
      getUsers()
    }
  }, [loggedIn])

  const onScan = () => {
    setScan(true)
  }

  const onStopScan = () => {
    setScan(false)

    getUsers()
  }

  return loggedIn ? (
    <>
    {scan && <Scanner onCancelScanning={onStopScan} />}
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 1000
    }}>
      <button onClick={onScan} style={{
        border: 'none',
        background: 'green',
        color: 'white',
        padding: 20,
        borderRadius: 10,
        fontWeight: 'bold'
      }}>Check in participant</button>
    </div>
      <WidgetsDropdown stats={stats} />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            {/* <CCardHeader>Traffic {' & '} Sales</CCardHeader> */}
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Location</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users?.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.checkedIn ? 'Checked In' : 'Not Checked In'}</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div style={{
                          textTransform: 'capitalize',
                        }}>{item.location}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  ) : <div style={{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>Loading..</div>
}

export default Dashboard
