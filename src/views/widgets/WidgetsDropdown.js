/* eslint-disable react/prop-types */

import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = ({ stats }) => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          style={{
            height: 100,
          }}
          value={
            <>
              {stats ? stats.gauteng.registered : '-'}
              <span className="fs-6 fw-normal">{stats ? ' (' + stats.gauteng.checkedIn + ')' : ' -'}</span>
            </>
          }
          title="Gauteng"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          style={{
            height: 100,
          }}
          value={
            <>
              {stats ? stats.kzn.registered : '-'}
              <span className="fs-6 fw-normal">{stats ? ' (' + stats.kzn.checkedIn + ')' : ' -'}</span>
            </>
          }
          title="KZN"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          style={{
            height: 100,
          }}
          value={
            <>
              {stats ? stats.limpopo.registered : '-'}
              <span className="fs-6 fw-normal">{stats ? ' (' + stats.limpopo.checkedIn + ')' : ' -'}</span>
            </>
          }
          title="Limpopo"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          style={{
            height: 100,
          }}
          value={
            <>
              {stats ? stats['northern-cape'].registered : '-'}
              <span className="fs-6 fw-normal">{stats ? ' (' + stats['northern-cape'].checkedIn + ')' : ' -'}</span>
            </>
          }
          title="Northern Cape"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
