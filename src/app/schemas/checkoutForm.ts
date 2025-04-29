import * as Yup from "yup";

export const checkoutValidationSchema = Yup.object().shape({
  name: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State/Province is required"),
  country: Yup.string().required("Country is required"),
});
