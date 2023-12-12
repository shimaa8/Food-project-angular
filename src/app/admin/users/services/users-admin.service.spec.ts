/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersAdminService } from './users-admin.service';

describe('Service: UsersAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersAdminService]
    });
  });

  it('should ...', inject([UsersAdminService], (service: UsersAdminService) => {
    expect(service).toBeTruthy();
  }));
});
