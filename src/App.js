import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ProtectedRoute,
  Landing,
  Error,
  Register,
  Login,
  SharedLayout,
  Contacts,
  AddContact,
  Stats,
  Profile,
} from './pages'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position='top-center'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='profile' element={<Profile />} />
          <Route path='contacts' element={<Contacts />} />
          <Route path='contacts/create' element={<AddContact />} />
          <Route path='contacts/edit' element={<AddContact />} />
        </Route>
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
