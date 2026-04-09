function PaginationBottomBar({page,setPage,totalPages}) {
  return (
    <div className="pagination">
      <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>

      {[...Array(10)].map((_, i) => {
        const pageNumber = Math.floor((page - 1) / 10) * 10 + i + 1;

        if (pageNumber > totalPages) return null;

        return (
          <button
            disabled={page === 1}
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
