import * as yup from "yup";

const numberRegex = /^57+[0-9]{10}/;

const messageSchema = yup.object({
  message: yup.string().required().min(3),
  phone: yup.string().required().matches(numberRegex) 
})

export const sendMessagesSchema = yup.object({
  body: yup.object({
    data: yup.array().of(messageSchema).required().min(1)
  }),
});