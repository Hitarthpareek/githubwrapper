function PaginationBottomBar({ page, setPage, totalPages }) {
  return (
    <div className="pagination">
      <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>

      {[...Array(5)].map((_, i) => {
        const start = Math.max(page - 2, 1); // center current page
        const pageNumber = start + i;

        if (pageNumber > totalPages) return null;

        return (
          <button
            key={pageNumber}
            className={page === pageNumber ? "active" : ""}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationBottomBar;
