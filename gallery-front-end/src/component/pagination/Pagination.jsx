import "./pagination.css";

export default function Pagination({
  pageNumbers,
  setCurrentPage,
  currentPage,
}) {
  // const POST_PER_PAGE = 3;
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="page previous"
      >
        Previous
      </button>
      {pageNumbers.map((page) => (
        <div
          onClick={() => {
            setCurrentPage(page);
          }}
          className={currentPage === page ? "page active" : "page"}
          key={page}
        >
          <p>{page}</p>
        </div>
      ))}
      <button
        disabled={currentPage === pageNumbers.length}
        onClick={() => setCurrentPage((current) => current + 1)}
        className="page next"
      >
        {"Next ->"}
      </button>
    </div>
  );
}
