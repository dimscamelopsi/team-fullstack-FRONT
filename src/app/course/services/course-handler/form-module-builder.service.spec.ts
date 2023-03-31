import { TestBed } from '@angular/core/testing';

import { FormModuleBuilderService } from './form-module-builder.service';

describe('FormModuleBuilderService', () => {
  let service: FormModuleBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormModuleBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
