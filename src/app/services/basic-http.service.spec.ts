import { TestBed } from '@angular/core/testing';

import { BasicHttpService } from './basic-http.service';

describe('BasicHttpService', () => {
  let service: BasicHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
