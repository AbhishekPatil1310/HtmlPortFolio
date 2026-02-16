import { z } from "zod";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(MAX_NAME_LENGTH, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email")
    .max(MAX_EMAIL_LENGTH, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short")
    .max(MAX_MESSAGE_LENGTH, "Message is too long"),
  company: z.string().trim().max(120).optional().default(""),
});

