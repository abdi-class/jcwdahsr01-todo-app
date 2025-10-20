import * as Yup from "yup";
export const inputTodoSchema = Yup.object().shape({
  todo: Yup.string().required("Todo is required"),
});
