import {Component, OnInit, TemplateRef} from '@angular/core';
import { environment } from 'src/environments/environment';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'ares-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  hotelName: string;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,) {
  }

  ngOnInit(): void {
    this.hotelName = environment.app.hotelName;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'h-100 d-flex flex-column justify-content-center my-0' })
    );
  }

}
