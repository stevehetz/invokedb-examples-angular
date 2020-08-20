import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { SORT_DIR, IGetParams } from 'src/app/invokedb/invokedb.params';
import { WineReviewService, IBaseFilterOpts } from './wine-review.service';
import { finalize } from 'rxjs/operators';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-wine-review',
  templateUrl: './wine-review.component.html',
  styleUrls: ['./wine-review.component.scss']
})
export class WineReviewComponent implements OnInit, AfterViewInit {
  priceRange = [0, 3300];
  pointRange = [87, 100];
  varietyText: any = '';
  countryText: any = '';
  filteredVarieties = [];
  filteredCountries = [];
  wines = [];
  totalWines = null;
  limit = 30;
  virtualScrollerRows = this.limit;
  loadWinesDebounceTimeout = null;
  loading = false;
  sortByDir = SORT_DIR.ASC;
  orderDirections = SORT_DIR;
  defaultSortBy = { label: 'Price', value: 'price' };
  sortBy;
  sortByOptions = [
    { label: 'Price', value: 'price' },
    { label: 'Points', value: 'points' },
    { label: 'Title', value: 'title' }
  ];

  @ViewChild('countryDropdown') countryDropdown: any;
  constructor(private svc: WineReviewService) {}

  ngOnInit() {
    this.reset();
  }

  ngAfterViewInit() {
    this.removeBrowserAutocompletes();
  }

  removeBrowserAutocompletes() {
    this.countryDropdown.renderer.setAttribute(
      this.countryDropdown.inputEL.nativeElement,
      'autocomplete',
      'no'
    );
  }

  reset() {
    this.varietyText = '';
    this.countryText = '';
    this.sortBy = this.defaultSortBy;
    this.sortByDir = SORT_DIR.ASC;
    this.priceRange = [0, 3300];
    this.pointRange = [87, 100];
    this.loadWinesDebounce();
  }

  priceRangeChanged() {
    this.loadWinesDebounce();
  }

  pointRangeChanged() {
    this.loadWinesDebounce();
  }

  varietiesKeyUp(event) {
    if (this.varietyText === '' && event.key.indexOf('Arrow') < 0) {
      this.filterVarieties(true);
    }
  }

  countriesKeyUp(event) {
    if (this.varietyText === '' && event.key.indexOf('Arrow') < 0) {
      this.filterCountries(true);
    }
  }

  getBaseFilter() {
    const opts: IBaseFilterOpts = {
      variety: this.varietyText,
      country: this.countryText,
      priceRange: this.priceRange,
      pointRange: this.pointRange
    };
    return this.svc.getBaseFilter(opts);
  }

  filterVarieties(reload?: true) {
    const filter = this.getBaseFilter();
    filter.$group = 'variety';

    this.svc.getFilteredVarieties(filter).subscribe(varieties => {
      this.filteredVarieties = varieties;
      if (reload) {
        this.loadWinesDebounce();
      }
    });
  }

  filterCountries(reload?: true) {
    const filter = this.getBaseFilter();
    filter.$group = 'country';

    this.svc.getFilteredCountries(filter).subscribe(countries => {
      this.filteredCountries = countries;
      if (reload) {
        this.loadWinesDebounce();
      }
    });
  }

  toggleSortDir() {
    this.sortByDir =
      this.sortByDir === SORT_DIR.ASC ? SORT_DIR.DESC : SORT_DIR.ASC;
    this.loadWinesDebounce();
  }

  loadWinesDebounce(event?) {
    this.loading = true;
    if (this.loadWinesDebounceTimeout) {
      window.clearTimeout(this.loadWinesDebounceTimeout);
    }
    this.loadWinesDebounceTimeout = window.setTimeout(
      () => this.loadWines(event),
      500
    );
  }

  loadWines(event?) {
    const skip = event ? event.first : 0;
    const limit = this.limit;
    const sort = {
      sortBy: this.sortBy.value,
      sortDir: this.sortByDir
    };

    const params: IGetParams = { skip, limit, sort };
    const filter = this.getBaseFilter();

    this.svc
      .getWines(params, filter)
      .pipe(
        finalize(() => (this.loading = false)),
        finalize(() => (this.loadWinesDebounceTimeout = null))
      )
      .subscribe(res => this.onWineGetSuccess(res));
  }

  onWineGetSuccess(res: any) {
    this.wines = res.data;
    this.totalWines = res.count;
    this.virtualScrollerRows = res.count < this.limit ? res.count : this.limit;
  }
}
