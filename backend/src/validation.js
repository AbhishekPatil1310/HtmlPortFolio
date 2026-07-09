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

const MAX_QUESTION_LENGTH = 2000;

export const chatSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Question is too short")
    .max(MAX_QUESTION_LENGTH, "Question is too long"),
  topK: z.number().int().positive().max(20).optional(),
});

export const visitSchema = z.object({
  path: z.string().trim().min(1).max(512),
  referrer: z.string().trim().max(1024).optional().default(""),
  timezone: z.string().trim().max(120).optional().default(""),
  locale: z.string().trim().max(35).optional().default(""),
  screen: z.string().trim().max(64).optional().default(""),
  visitorId: z.string().trim().max(64).optional().default(""),
});
