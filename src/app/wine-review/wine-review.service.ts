import { Injectable } from '@angular/core';
import { IGetParams, SORT_DIR } from 'src/app/invokedb/invokedb.params';
import { InvokedbService } from 'src/app/invokedb/invokedb.service';
import { map } from 'rxjs/operators';

export interface IBaseFilterOpts {
  variety?: any;
  country?: any;
  priceRange?: Array<number>;
  pointRange?: Array<number>;
}

@Injectable({
  providedIn: 'root'
})
export class WineReviewService {
  constructor(private invokedb: InvokedbService) {}

  getPriceFilter(priceRange) {
    return [
      {
        value: priceRange[0],
        type: 'greaterThanOrEqual'
      },
      {
        value: priceRange[1],
        type: 'lessThanOrEqual'
      }
    ];
  }

  getPointFilter(pointRange) {
    return [
      {
        value: pointRange[0],
        type: 'greaterThanOrEqual'
      },
      {
        value: pointRange[1],
        type: 'lessThanOrEqual'
      }
    ];
  }

  getVarietyFilter(variety) {
    return {
      value: variety.variety || variety,
      type: 'contains',
      case: 'insensitive'
    };
  }

  getCountryFilter(country) {
    return {
      value: country.country || country,
      type: 'contains',
      case: 'insensitive'
    };
  }

  getBaseFilter(opts: IBaseFilterOpts) {
    const { variety, country, priceRange, pointRange } = opts;

    const filter: any = {};
    filter.price = this.getPriceFilter(priceRange);
    filter.points = this.getPointFilter(pointRange);

    if (variety) {
      filter.variety = this.getVarietyFilter(variety);
    }

    if (country) {
      filter.country = this.getCountryFilter(country);
    }

    return filter;
  }

  getFilteredVarieties(filter) {
    const params: IGetParams = {
      skip: 0,
      limit: 1000,
      sort: {
        sortBy: 'variety',
        sortDir: SORT_DIR.ASC
      }
    };

    return this.getWines(params, filter).pipe(map((r: any) => r.data));
  }

  getFilteredCountries(filter) {
    const params: IGetParams = {
      skip: 0,
      limit: 1000,
      sort: {
        sortBy: 'country',
        sortDir: SORT_DIR.ASC
      }
    };

    return this.getWines(params, filter).pipe(map((r: any) => r.data));
  }

  getWines(params, filter) {
    return this.invokedb.get('winereview', params, filter);
  }
}
