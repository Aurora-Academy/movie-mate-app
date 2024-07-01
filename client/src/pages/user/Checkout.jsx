import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NotifyWithLink } from "../../components/Notify";

const Checkout = () => {
  const [payload, setPayload] = useState({
    type: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const { cart } = useSelector((state) => state.cart);

  const userInfo = JSON.parse(localStorage.getItem("currentUser"));

  const totalAmount = () =>
    cart.reduce((acc, obj) => acc + obj.quantity * obj.price, 0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, ...rest } = payload;
    rest.name = firstName.concat(" ", lastName);
    rest.products = cart.map((item) => {
      return {
        quantity: item?.quantity,
        price: item?.price,
        movie: item?._id,
        amount: item?.price * item?.quantity,
      };
    });
    rest.buyer = "";
    rest.total = totalAmount();
    console.log({ rest });
    // send to the ORDER API
  };

  useEffect(() => {
    if (userInfo?.id) {
      localStorage.removeItem("redirectUrl");
    }
  }, [userInfo?.id]);
  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Checkout</h2>
      </div>
      {!localStorage.getItem("access_token") && !userInfo && (
        <NotifyWithLink
          message={"Please Login to buy the tickets"}
          link="/checkout"
          forward={"/login"}
        />
      )}
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            {cart?.length > 0 &&
              cart.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between lh-condensed"
                >
                  <div>
                    <div className="row">
                      <Image
                        className="col-md-2"
                        src={item?.poster}
                        width={40}
                      />
                      <div className="col-md-10">
                        <h6 className="my-0">{item?.title}</h6>
                        <small className="text-muted">
                          {item?.synopsis.substring(0, 60).concat("...")}
                        </small>
                      </div>
                    </div>
                  </div>
                  <span className="text-muted">
                    {Number(item?.quantity * item?.price).toFixed(2)}
                  </span>
                </li>
              ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (Rs)</span>
              <strong>{totalAmount()}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing Information</h4>
          <form
            className="needs-validation"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, firstName: e.target.value };
                    })
                  }
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, lastName: e.target.value };
                    })
                  }
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
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
                onChange={(e) =>
                  setPayload((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <hr className="mb-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="d-block my-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payRadios"
                  value="online"
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, type: e.target.value };
                    })
                  }
                />
                <label className="form-check-label">Esewa</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payRadios"
                  value="cod"
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, type: e.target.value };
                    })
                  }
                />
                <label className="form-check-label">Cash on Delivery</label>
              </div>
            </div>
            <hr className="mb-4" />
            <button
              className="btn btn-primary btn-lg btn-block"
              type="submit"
              disabled={!userInfo}
            >
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
