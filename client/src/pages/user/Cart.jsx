import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IoIosBasket, IoIosTrash } from "react-icons/io";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import {
  remove,
  increaseQuantity,
  decreaseQuantity,
  removeAll,
} from "../../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const totalAmount = () =>
    cart.reduce((acc, obj) => acc + obj.quantity * obj.price, 0);

  return (
    <div>
      {cart?.length > 0 ? (
        <FullCart
          items={cart}
          decrease={decreaseQuantity}
          increase={increaseQuantity}
          remove={remove}
          dispatch={dispatch}
          total={totalAmount}
        />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

const EmptyCart = () => {
  return (
    <>
      <div className="m-4 bg-body-tertiary rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Your cart is empty</h1>
          <Link to="/" className="btn btn-secondary btn-lg">
            <IoIosBasket /> Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

const FullCart = ({ items, decrease, increase, remove, dispatch, total }) => {
  return (
    <>
      <h1 className="text-center m-5">Your Cart</h1>
      <div className="d-flex justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger"
              onClick={() => dispatch(removeAll())}
            >
              Empty Cart
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Avail Quantity</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.title}</td>
                    <td>
                      <Image
                        width={40}
                        height={40}
                        src={item?.poster}
                        thumbnail
                      />
                    </td>
                    <td>{item?.price}</td>
                    <td>{item?.seats - item?.quantity}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => dispatch(decrease(item))}
                        >
                          -
                        </button>
                        {item?.quantity}
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => dispatch(increase(item))}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{item?.quantity * item?.price}</td>
                    <td>
                      <IoIosTrash
                        size="1.5rem"
                        color="maroon"
                        onClick={() => {
                          dispatch(remove(item?.slug));
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={5}>
                  <div>Total Amount (Rs.)</div>
                </td>
                <td>{total()}</td>
                <td>
                  <Link to="/checkout">
                    <button className="btn btn-success">
                      <MdOutlineShoppingCartCheckout />
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cart;
