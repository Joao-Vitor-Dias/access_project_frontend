import { TestBed } from '@angular/core/testing';

import { BackComunication } from './back-comunication';

describe('BackComunication', () => {
  let service: BackComunication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackComunication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
