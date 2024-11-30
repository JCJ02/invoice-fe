const generatePaginationLinks = (currentPage: number, totalPages: number): number[] => {
    const visiblePages = 5; // NUMBER OF PAGES TO DISPLAY
    let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(totalPages, start + visiblePages - 1);

    // ADJUST THE START AND END IF THERE AREN'T ENOUGHT PAGES
    if (end - start < visiblePages - 1) {
      start = Math.max(1, end - visiblePages + 1);
    }

    // GENERATE THE RANGE OF PAGE NUMBERS
    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
}

export default generatePaginationLinks;