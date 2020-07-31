import React from 'react';
import {useSelector} from 'react-redux';
import './../components/css/Loader.css';

export default function Loader() {
    const {loading: categoryListLoading} = useSelector((state) => state.categoryList);
    const {loading: productListLoading} = useSelector((state) => state.productList);
    const {loading: orderPayLoading} = useSelector((state) => state.orderPay);
    const {loading: orderListLoading} = useSelector((state) => state.orderList);
    const {loading: orderCreateLoading} = useSelector((state) => state.orderCreate);
    const {loading: productDetailsLoading} = useSelector((state) => state.productDetails);
    const {loading: productSaveLoading} = useSelector((state) => state.productSave);
    const {loading: productDeleteLoading} = useSelector((state) => state.productDelete);
    const {loading: userUpdateLoading} = useSelector((state) => state.userUpdate);
    const {loading: myOrderListLoading} = useSelector((state) => state.myOrderList);
    const {loading: userRegisterLoading} = useSelector((state) => state.userRegister);
    const {loading: userSigninLoading} = useSelector((state) => state.userSignin);
    const isLoading = (
      categoryListLoading
      || productListLoading
      || orderPayLoading
      || orderListLoading
      || orderCreateLoading
      || productDetailsLoading
      || productSaveLoading
      || productDeleteLoading
      || userUpdateLoading
      || myOrderListLoading
      || userRegisterLoading
      || userSigninLoading
      );
  return (
    <>
    { isLoading && (
        <div className="progress">
            <div className="indeterminate"></div>
        </div>
    )}
    </>
  );
}
