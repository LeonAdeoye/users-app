import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import { Answer } from "../models/types";
import { PopupComponent } from "../components/popup/popup.component";
import { take } from "rxjs/operators";
import { DeskUsageComponent } from "../components/desk-usage/desk-usage.component";

@Injectable({
  providedIn: "root"
})
export class PopupService
{
  private bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  show(titleToDisplay: string, messageToDisplay: string, ok?: boolean, cancel?: boolean, yes?: boolean, no?: boolean, isErrorPopupFlag?: boolean): Subject<Answer>
  {
    const initialState =
    {
      message: messageToDisplay,
      title: titleToDisplay,
      isErrorPopup: isErrorPopupFlag === null ? false : isErrorPopupFlag,
      class: "modal-dialog modal-lg"
    };

    this.bsModalRef = this.modalService.show(PopupComponent, initialState);
    this.initialise(yes, no, ok, cancel);
    return this.bsModalRef.content.answerSubject.pipe(take(1));
  }

  showDeskUsage(deskName: string): Subject<Answer>
  {
    const initialState =
    {
      width: 600,
      height: 400,
      title: "Desk usage for " + deskName,
      isErrorPopup: false,
      class: "modal-dialog modal-lg"
    };

    this.bsModalRef = this.modalService.show(DeskUsageComponent, { initialState, keyboard: false });
    this.initialise(false, false, false, false);
    return this.bsModalRef.content.answerSubject.pipe(take(1));
  }

  private initialise(yes: boolean, no: boolean, ok: boolean, cancel: boolean): void
  {
    this.bsModalRef.content.answerSubject = new Subject<Answer>();

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
