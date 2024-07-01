import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Notify = ({ variant = "danger", message }) => {
  return (
    <>
      <Alert variant={variant}>{message}</Alert>
    </>
  );
};

export const NotifyWithLink = ({
  variant = "danger",
  message,
  link,
  forward,
}) => {
  const handleRedirectUrl = (link) => {
    localStorage.setItem("redirectUrl", link);
  };
  return (
    <>
      <Alert variant={variant}>
        {message}&nbsp;
        <Link
          className="alert-link"
          to={forward}
          onClick={() => handleRedirectUrl(link)}
        >
          Click here
        </Link>
        .
      </Alert>
    </>
  );
};
