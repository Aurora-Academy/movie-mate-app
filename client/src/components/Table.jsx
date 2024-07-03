import { Table } from "react-bootstrap";

const CTable = ({ header = [], data = [] }) => {
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
                <td>{/* Something remaining */}</td>
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
