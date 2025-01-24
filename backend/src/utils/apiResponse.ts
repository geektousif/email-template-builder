class SuccessResponse {
  success = true;
  data: any;
  message: string;
  constructor(data: any = null, message: string) {
    this.data = data;
    this.message = message;
  }
}

class ErrorResponse {
  success = false;
  error: any;
  constructor(error: any) {
    this.error = error;
  }
}

export { SuccessResponse, ErrorResponse };
