import { TestBed } from '@angular/core/testing';

import { PopupService } from '../services/popup.service';
import { BsModalService, BsModalRef, ModalModule } from "ngx-bootstrap/modal";
import { HttpTestingController } from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";

describe('PopupService', () =>
{
  let service: PopupService;
  const spyBsModalService = jasmine.createSpyObj('BsModalService', ['show', 'showDeskUsage'])

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
        providers:
        [
          HttpTestingController,
          PopupService,
          { provide: BsModalService, useValue: spyBsModalService }
        ],
        imports:
        [
          ModalModule.forRoot(),
          HttpClientModule
        ]
      });
    service = TestBed.inject(PopupService);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });
});
