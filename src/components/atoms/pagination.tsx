interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex flex-wrap gap-1 md:gap-2 items-center justify-center ${className}`}>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="box-border cursor-pointer flex gap-0.5 md:gap-1 items-center justify-center p-1 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          className={`md:w-5 md:h-5 ${currentPage === 1 ? 'text-[#D2D5D9]' : 'text-[#49535D]'}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={`font-inter font-normal text-sm md:text-base leading-5 md:leading-6 text-center ${
          currentPage === 1 ? 'text-[#BBBCBF]' : 'text-[#49535D]'
        }`}>
          Previous
        </span>
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <div
              key={`ellipsis-${index}`}
              className="box-border flex gap-1 items-center justify-center p-1"
            >
              <span className="font-inter font-normal text-sm md:text-base leading-5 md:leading-6 text-center text-[#BBBCBF]">
                ...
              </span>
            </div>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className="box-border flex gap-1 cursor-pointer items-center justify-center p-1"
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={`font-inter font-normal text-sm md:text-base leading-5 md:leading-6 text-center ${
              isActive ? 'text-[#49535D]' : 'text-[#BBBCBF]'
            }`}>
              {page}
            </span>
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="box-border flex gap-0.5 md:gap-1 cursor-pointer items-center justify-center p-1 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <span className={`font-inter font-normal text-sm md:text-base leading-5 md:leading-6 text-center ${
          currentPage === totalPages ? 'text-[#BBBCBF]' : 'text-[#49535D]'
        }`}>
          Next
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          className={`md:w-5 md:h-5 ${currentPage === totalPages ? 'text-[#D2D5D9]' : 'text-[#49535D]'}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 15L12.5 10L7.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

