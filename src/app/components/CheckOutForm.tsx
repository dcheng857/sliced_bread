import { Field, Form, Formik } from "formik";
import { initialCheckoutFormValues } from "../constants/order";
import { generateRandomName } from "../helpers/order";
import { checkoutValidationSchema } from "../schemas/checkoutForm";
import { CustomerInfo } from "../types/customer";
import CartSummary from "./CartSummary";

interface CheckOutFormProps {
  onSubmit: (values: CustomerInfo) => void;
  totalPrice: number;
}
export default function CheckOutForm(props: CheckOutFormProps) {
  const { onSubmit, totalPrice } = props;

  const handleSubmit = (values: CustomerInfo): void => {
    const finalValues = {
      ...values,
      name: values.name.trim() || generateRandomName(),
    };

    onSubmit(finalValues);
  };

  return (
    <Formik
      initialValues={initialCheckoutFormValues}
      validationSchema={checkoutValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <Field
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your name (or leave blank for a random name)"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              City *
            </label>
            <Field
              name="city"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.city && touched.city ? "border-red-500" : ""}`}
              placeholder="Enter your city"
            />
            {errors.city && touched.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              State/Province *
            </label>
            <Field
              name="state"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.state && touched.state ? "border-red-500" : ""}`}
              placeholder="Enter your state/province"
            />
            {errors.state && touched.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Country *
            </label>
            <Field
              name="country"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.country && touched.country ? "border-red-500" : ""}`}
              placeholder="Enter your country"
            />
            {errors.country && touched.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>

          <CartSummary totalPrice={totalPrice} />
        </Form>
      )}
    </Formik>
  );
}
