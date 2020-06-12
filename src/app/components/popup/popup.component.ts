import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Answer } from "../../models/types";
import { Subject } from "rxjs";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.sass"]
})
export class PopupComponent implements OnInit
{
  public showOkButton = false;
  public showNoButton = false;
  public showYesButton = false;
  public showCancelButton = false;
  public title: string;
  public message: string;
  public width: number;
  public isErrorPopup: boolean;
  public answerSubject: Subject<Answer>;

  constructor(public bsModalRef: BsModalRef)
  {
  }

  ngOnInit(): void
  {
  }

  public okClick(): void
  {
    this.answerSubject.next(Answer.OK);
    this.bsModalRef.hide();
  }

  public noClick(): void
  {
    this.answerSubject.next(Answer.NO);
    this.bsModalRef.hide();
  }

  public yesClick(): void
  {
    this.answerSubject.next(Answer.YES);
    this.bsModalRef.hide();
  }

  public cancelClick(): void
  {
    this.answerSubject.next(Answer.CANCEL);
    this.bsModalRef.hide();
  }
}
