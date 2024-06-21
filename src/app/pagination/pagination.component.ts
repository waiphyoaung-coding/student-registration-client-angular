import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 0;
  @Output() onPageChange = new EventEmitter<number>();
  
  activePage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems'] || changes['itemsPerPage']) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePages();
    }
  }

  handlePageChange(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.activePage = pageNumber;
    this.onPageChange.emit(pageNumber);
    this.updatePages();
  }

  updatePages() {
    this.pages = [];
    if (this.totalPages > 0) {
      // Always show the first page
      this.pages.push(1);
    }

    if (this.activePage > 4) {
      this.pages.push(-1); // Use -1 as a placeholder for ellipsis
    }

    const startPage = Math.max(2, this.activePage - 2);
    const endPage = Math.min(this.totalPages - 1, this.activePage + 2);

    for (let number = startPage; number <= endPage; number++) {
      this.pages.push(number);
    }

    if (this.activePage < this.totalPages - 3) {
      this.pages.push(-1); // Use -1 as a placeholder for ellipsis
    }

    if (this.totalPages > 1) {
      // Always show the last page
      this.pages.push(this.totalPages);
    }
  }

}
