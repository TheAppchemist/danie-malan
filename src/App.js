import React, { Component, Suspense, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { initializeApp } from 'firebase/app'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const firebaseConfig = {
  apiKey: "AIzaSyB-G9bNw5K6PcVxul1Y1s2sc4CBNilK26U",
  authDomain: "ai-mashup.firebaseapp.com",
  projectId: "ai-mashup",
  storageBucket: "ai-mashup.appspot.com",
  messagingSenderId: "583307514463",
  appId: "1:583307514463:web:e70f6aa212f6d7439e01ea"
};


const App = () => {
  const [app] = useState(initializeApp(firebaseConfig));

  return app ? (<HashRouter>
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route path="*" name="Home" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  </HashRouter>) : ''
}

export default App
