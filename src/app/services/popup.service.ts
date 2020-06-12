import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import { Answer } from "../models/types";
import { PopupComponent } from "../components/popup/popup.component";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PopupService
{
  private bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  show(titleToDisplay: string, messageToDisplay: string, ok?: boolean, cancel?: boolean, yes?: boolean, no?: boolean, isErrorPopupFlag?: boolean): Subject<Answer>
  {
    const windowProperties =
    {
      width: 400,
      message: messageToDisplay,
      title: titleToDisplay,
      isErrorPopup: isErrorPopupFlag === null ? false : isErrorPopupFlag,
      class: "modal-dialog modal-sm"
    };

    this.bsModalRef = this.modalService.show(PopupComponent, windowProperties);
    this.initialise(yes, no, ok, cancel);
    return this.bsModalRef.content.answerSubject.pipe(take(1));
  }

  private initialise(yes: boolean, no: boolean, ok: boolean, cancel: boolean): void
  {
    this.bsModalRef.content.answerSubject = new Subject<boolean>();

    if(yes)
      this.bsModalRef.content.showYesButton = true;

    if(no)
      this.bsModalRef.content.showNoButton = true;

    if(cancel)
      this.bsModalRef.content.showCancelButton = true;

    if(ok)
      this.bsModalRef.content.showOkButton = true;
  }
}
