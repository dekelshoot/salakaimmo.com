export interface ModalConfig {
  modalTitle: string
  validateButtonLabel: string
  closeButtonLabel: string
  modalBody: string;
  shouldClose?(): Promise<boolean> | boolean
  shouldValidate?(): Promise<boolean> | boolean
  onClose?(): Promise<boolean> | boolean
  onValidate?(): Promise<boolean> | boolean
  disableCloseButton?(): boolean
  disableValidateButton?(): boolean
  hideCloseButton?(): boolean
  hideValidateButton?(): boolean
}


export interface ModalConfigLoader {
  modalTitle: string
  validateButtonLabel: string
  modalBody: string;
  error: string;
  success: string;
  shouldValidate?(): Promise<boolean> | boolean
  onValidate?(): Promise<boolean> | boolean
  disableValidateButton?(): boolean
  hideValidateButton?(): boolean
}

