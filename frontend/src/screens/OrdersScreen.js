import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if(!userInfo)
      props.history.replace("/signin?redirect=orders");
  }, [userInfo])
  
  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return (
    <>
      {userInfo ? userInfo.isAdmin ? loading ? <div>Loading...</div> :
      <div className="content content-margined">

        <div className="order-header">
          <h3>Orders</h3>
        </div>
        <div className="order-list table-responsive">

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>USER</th>
                <th>PAID</th>
                <th>PAID AT</th>
                <th>DELIVERED</th>
                <th>DELIVERED AT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (<tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.user.name}</td>
                <td>{order.isPaid.toString()}</td>
                <td>{order.paidAt}</td>
                <td>{order.isDelivered.toString()}</td>
                <td>{order.deliveredAt}</td>
                <td>
                  <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
                  {' '}
                  <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
                </td>
              </tr>))}
            </tbody>
          </table>

        </div>
      </div> : <h1 style={{color: "red"}}>403 Unauthorized</h1> : ""}
    </>
  )
}
export default OrdersScreen;