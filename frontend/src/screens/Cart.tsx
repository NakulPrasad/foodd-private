import { useCart, useDispatchCart } from '../context/ContextReducer'
import deleteItemPNG from './deleteItem.png'
import URLs from '../configs/URLs.js'
import usePostData from '../hooks/usePostData.js'

export default function Cart () {
  const data = useCart()
  const dispatch = useDispatchCart()
  const [isLoading, postData] = usePostData()
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center text-white fs-3'>
          The Cart is Empty!
        </div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    const order = {
      order_data: data,
      order_date: new Date().toUTCString()
    }
    const response = await postData(URLs.postOrder, order)

    if (response && !isLoading) {
      dispatch({ type: 'DROP' })
    }
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col' />
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                {/* code to delete itme in card :
                                dispatch({ type: "REMOVE", index: index }) */}
                <td>
                  <button type='button' className='btn p-0'>
                    <img
                      width='20'
                      alt='...'
                      src={deleteItemPNG}
                      onClick={() => {
                        dispatch({ type: 'REMOVE', index })
                      }}
                    />
                  </button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut}>
            {' '}
            Check Out{' '}
          </button>
        </div>
      </div>
    </div>
  )
}
