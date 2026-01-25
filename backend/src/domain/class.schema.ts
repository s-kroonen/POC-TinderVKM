import { z } from "zod";

export const ClassSchema = z.object({
    name: z.string().min(1, "Name is required"),
    shortdescription: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    studycredit: z.number().min(0, "Study credits must be >= 0").optional(),
    location: z.string().optional(),
    level: z.string().optional(),
    learningoutcomes: z.string().optional(),
    module_tags: z.array(z.string()).optional(),
    available_spots: z.number().min(0).optional(),
    start_date: z.string().optional(),
});

export type ClassInput = z.infer<typeof ClassSchema>;
