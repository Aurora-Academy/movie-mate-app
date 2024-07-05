import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";

const CTable = ({ header = [], data = [], edit }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {header.map((item) => (
            <th key={item} className="text-center text-capitalize">
              {item}
            </th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <tr key={index}>
                {header.map((key, index) => {
                  return <td key={index}>{item[key]}</td>;
                })}
                <td>
                  {edit && (
                    <Link to={edit.concat("/", item?.id || item?._id)}>
                      <BsPencilSquare />
                    </Link>
                  )}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={header.length + 1} style={{ textAlign: "center" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CTable;
