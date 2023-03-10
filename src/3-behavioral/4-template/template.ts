// * â Command solution

export interface BusinessTemplateInterface {
  execute(payload: string): string;
}

export abstract class BusinessTemplate implements BusinessTemplateInterface {
  public execute(payload: string): string {
    try {
      // * đ hard coded instrumentation steps
      console.log("âšī¸  transaction started");
      const paymentResult = this.processTransaction(payload);
      console.log("âšī¸  transaction processed");
      const businessResult = this.doBusinessAction(paymentResult);
      console.log("âšī¸  action done");
      this.sendNotification(businessResult);
      console.log("âšī¸  notification sent");
      return businessResult;
    } catch (error) {
      // * đ hard coded common step
      console.log("âšī¸ đĩâđĢ error: " + error);
      return "";
    }
  }
  // * đ mandatory steps
  protected abstract processTransaction(payload: string): string;
  protected abstract doBusinessAction(payload: string): string;
  // * đ optional step with default implementation if not overridden
  protected sendNotification(payload = ""): void {
    console.warn("â Done " + payload);
  }
}

// * đ custom implementation steps while enrollment or cancellation

export class EnrollActivity extends BusinessTemplate {
  protected processTransaction(destination: string): string {
    return "đ¸  Paying Activity to " + destination;
  }
  protected doBusinessAction(payment: string): string {
    return "âđŧ Booking Activity " + payment;
  }
  protected override sendNotification(booking: string): void {
    console.warn("đ§ Activity booked " + booking);
  }
}

export class CancelActivity extends BusinessTemplate {
  protected processTransaction(destination: string): string {
    return "đ¤  Refunding Activity " + destination;
  }
  protected override doBusinessAction(refund: string): string {
    return "đ­  Cancelling Activity " + refund;
  }
}

export class Client {
  // * đ you can depend on abstraction not implementation
  private enrolling: BusinessTemplateInterface = new EnrollActivity();
  private cancel: BusinessTemplate = new CancelActivity();
  public run(): void {
    this.enrolling.execute("Snorkeling on the Red Sea");
    this.cancel.execute("Snorkeling on the Red Sea");
  }
}

const client = new Client();
client.run();
