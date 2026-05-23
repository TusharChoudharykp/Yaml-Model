import { z } from "zod";

export const modelSchema = z.object({

  modelName:
    z.string().min(3),

  teamName:
    z.string().min(2),

  ownerEmail:
    z.string().email(),

  description:
    z.string().min(10),

  endpoint:
    z.string().url(),

  namespace:
    z.string().min(2),

  port:
    z.number().min(1),

  variant:
    z.string(),

  weight:
    z.number().min(1).max(100),

  timeout:
    z.number().min(1),

  rps:
    z.number().min(1),
});