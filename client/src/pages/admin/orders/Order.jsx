import { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getOrder,
  updateOrder,
  changeOrderStatus,
} from "../../../slices/orderSlice";

const Order = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderId = pathname.split("/")[3];

  const { order } = useSelector((state) => state.orders);

  const [payload, setPayload] = useState({
    name: order?.name || "",
    email: order?.email || "",
    total: order?.total || "",
    type: order?.type || "",
    products: order?.products || [],
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateOrder({ id: orderId, payload }));
    navigate("/admin/orders");
  };

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    setPayload({
      name: order?.name || "",
      email: order?.email || "",
      total: order?.total || "",
      type: order?.type || "",
      products: order?.products || [],
    });
  }, [order]);

  return (
    <div>
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout</h2>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {order?.products?.length > 0 &&
                order?.products.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between lh-condensed"
                  >
                    <div>
                      <div className="row">
                        <Image
                          className="col-md-2"
                          src={item?.movie?.poster}
                          width={40}
                        />
                        <div className="col-md-10">
                          <h6 className="my-0">
                            {item?.movie?.title}&nbsp;*
                            <span className="text-danger">
                              &nbsp;{item?.quantity}
                            </span>
                          </h6>
                          <small className="text-muted"></small>
                        </div>
                      </div>
                    </div>
                    <span className="text-danger">{Number(item?.amount)}</span>
                  </li>
                ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (Rs)</span>
                <strong>{order?.total}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing Information</h4>
            <form
              className="needs-validation"
              onSubmit={(e) => handleUpdate(e)}
            >
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={payload?.name}
                    onChange={(e) => {
                      setPayload((prev) => {
                        return { ...prev, name: e.target.value };
                      });
                    }}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid name is required.
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label>
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={payload?.email}
                  onChange={(e) => {
                    setPayload((prev) => {
                      return { ...prev, email: e.target.value };
                    });
                  }}
                />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
              <hr className="mb-4" />
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <select
                  className="form-select"
                  value={payload?.type}
                  onChange={(e) => {
                    setPayload((prev) => {
                      return { ...prev, type: e.target.value };
                    });
                  }}
                >
                  <option value="ONLINE">Esewa</option>
                  <option value="COD">Cash on Delivery</option>
                </select>
              </div>
              <hr className="mb-4" />
              <h4 className="mb-3">Payment Status</h4>
              <div className="d-block my-3">
                <select
                  className="form-select"
                  value={order?.status}
                  onChange={(e) => {
                    dispatch(
                      changeOrderStatus({
                        id: orderId,
                        payload: { status: e.target.value },
                      })
                    );
                  }}
                >
                  <option value="completed">COMPLETED</option>
                  <option value="failed">FAILED</option>
                  <option value="cancelled">CANCELLED</option>
                  <option value="pending">PENDING</option>
                </select>
              </div>
              <hr className="mb-4" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                SAVE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
