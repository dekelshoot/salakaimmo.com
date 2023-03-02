import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ModalConfig, ModalConfigLoader } from './modal.config'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig!: ModalConfig
  @Input() public modalConfigLoader!: ModalConfigLoader
  @Input() public loading!: Boolean
  @Input() public success!: Boolean
  @Input() public error!: Boolean
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>
  private modalRef!: NgbModalRef
  @ViewChild('modalLoader') private modalContentLoader!: TemplateRef<ModalComponent>
  private modalLoaderRef!: NgbModalRef
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { centered: true })
      this.modalRef.result.then(resolve, resolve)
    })
  }

  openLoader(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalLoaderRef = this.modalService.open(this.modalContentLoader, { centered: true })
      this.modalLoaderRef.result.then(resolve, resolve)
    })
  }



  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async validate(): Promise<void> {
    if (this.modalConfig.shouldValidate === undefined || (await this.modalConfig.shouldValidate())) {
      const result = this.modalConfig.onValidate === undefined || (await this.modalConfig.onValidate())
      this.modalRef.dismiss(result)
    }
  }

  async validateLoader(): Promise<void> {
    if (this.modalConfigLoader.shouldValidate === undefined || (await this.modalConfigLoader.shouldValidate())) {
      const result = this.modalConfigLoader.onValidate === undefined || (await this.modalConfigLoader.onValidate())
      this.modalLoaderRef.dismiss(result)
    }
  }
}
