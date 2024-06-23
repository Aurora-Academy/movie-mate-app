import { Alert } from "react-bootstrap";

export const Notify = ({ variant = "danger", message }) => {
  return (
    <>
      <Alert variant={variant}>{message}</Alert>
    </>
  );
};
