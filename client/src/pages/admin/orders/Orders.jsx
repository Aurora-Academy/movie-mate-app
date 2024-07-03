import { useCallback, useEffect } from "react";
import { Card } from "react-bootstrap";
import CTable from "../../../components/Table";
import Paginate from "../../../components/Paginate";

import { useDispatch, useSelector } from "react-redux";
import {
  listOrder,
  setCurrentPage,
  setLimit,
} from "../../../slices/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { total, currentPage, orders, limit } = useSelector(
    (state) => state.orders
  );

  const extractHeader = (data) => {
    if (data.length === 0) return [];
    const { buyer, createdAt, id, products, updatedAt, __v, _id, ...rest } =
      data[0];
    return Object.keys(rest);
  };

  const initFetch = useCallback(() => {
    dispatch(listOrder({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="mt-4">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <h3>Orders</h3>
            <button className="btn btn-danger btn-sm">+ New Order</button>
          </div>
        </Card.Header>
        <Card.Body>
          {orders && <CTable header={extractHeader(orders)} data={orders} />}
          <Paginate
            total={total}
            limit={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Orders;
