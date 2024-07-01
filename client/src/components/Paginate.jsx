import { Pagination } from "react-bootstrap";
import { usePagination, DOTS } from "../hooks/usePagination";

const Paginate = ({ total, limit, setCurrentPage, setLimit, currentPage }) => {
  let activePage = currentPage;
  let items = [];
  const totalNumberOfPages = Math.ceil(total / limit);
  for (let number = 1; number <= totalNumberOfPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount: 1,
    pageSize: +limit,
  });
  return (
    <>
      <div className="d-flex justify-content-center gap-2">
        <div className="col-md-2" style={{ maxWidth: "65px" }}>
          <select
            className="form-select form-select-sm"
            style={{ height: "38px" }}
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={4}>4</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
        </div>
        <Pagination>
          <Pagination.First
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          />
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() =>
              currentPage === 1 ? null : setCurrentPage(currentPage - 1)
            }
          />
          {paginationRange.map((number, index) => {
            if (number === DOTS) {
              return <Pagination.Ellipsis key={`${number}-${index}`} />;
            }
            return (
              <Pagination.Item
                key={number}
                onClick={() => setCurrentPage(number)}
                active={currentPage === number}
              >
                {number}
              </Pagination.Item>
            );
          })}

          <Pagination.Next
            disabled={currentPage === totalNumberOfPages}
            onClick={() =>
              currentPage === totalNumberOfPages
                ? null
                : setCurrentPage(currentPage + 1)
            }
          />
          <Pagination.Last
            disabled={currentPage === totalNumberOfPages}
            onClick={() => setCurrentPage(totalNumberOfPages)}
          />
        </Pagination>
      </div>
    </>
  );
};

export default Paginate;
