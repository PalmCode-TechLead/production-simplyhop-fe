import { AlertApp } from "@/core/modules/app/fragments/alert";
import { PaymentSupportContainer } from "@/features/support/payment/container";

export default function PaymentPage() {
  return (
    <>
      <PaymentSupportContainer />
      <AlertApp />
    </>
  );
}
