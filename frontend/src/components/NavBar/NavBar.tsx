import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import Cart from '../../screens/Cart'
import { useCart } from '../../context/ContextReducer'
import { useUser } from '../../hooks/useUser'

const NavBar = () => {
  const navigate = useNavigate()
  // const { getItem, removeItem } = useCookie();
  const { removeUser, user } = useUser()

  const handleLogout = () => {
    removeUser()
    navigate('/login')
  }

  const [cartView, setCartView] = useState(false)

  const data = useCart()

  return (
    <header className='p-3 bg-dark text-white'>
      <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start '>
        <span className='fs-4 mx-3 fst-italic '>Foodd</span>

        <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
          <li className='nav-item'>
            <Link to='/' className='nav-link active text-white'>
              Home
            </Link>
          </li>

          {user && (
            <>
              <li className='nav-item'>
                <Link to='/myOrder' className='nav-link text-white '>
                  My Orders
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/partner-with-us/new' className='nav-link text-white '>
                  Add Restraunt
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className='text-end'>
          {!user
            ? (
              <div>
                <Link to='/login' className='btn btn-warning me-2'>
                  Login
                </Link>
                <Link to='/login' className='btn btn-warning'>
                  Sign-up
                </Link>
              </div>
              )
            : (
              <div>
                <button
                  className='btn btn-warning me-2'
                  onClick={() => {
                    setCartView(true)
                  }}
                >
                  My Cart{' '}
                  <span className='mw-1 badge bg-danger'>{data.length}</span>
                </button>
                {cartView
                  ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                    )
                  : null}
                <Link to='' className='btn btn-danger' onClick={handleLogout}>
                  Log Out
                </Link>
              </div>
              )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
