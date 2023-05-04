import { TestBed } from '@angular/core/testing';

import { FormUserBuilderService } from './form-user-builder.service';

describe('FormUserBuilderService', () => {
  let service: FormUserBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormUserBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
