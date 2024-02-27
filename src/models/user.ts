import { z } from 'zod';

const UserSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
        })
        .trim()
        .min(1, 'Email cannot be empty')
        .email('Invalid email'),
    name: z
        .string({
            required_error: 'Name is required',
        })
        .trim()
        .min(1, 'Name cannot be empty')
        .max(256, 'Name cannot be more than 256 characters'),
    bio: z
        .string()
        .trim()
        .max(1024, 'Bio cannot be more than 1024 characters')
        .optional()
        .nullable(),
    picture: z.string().trim().url('Invalid picture URL').optional().nullable(),
});

type User = z.infer<typeof UserSchema>;

export { User, UserSchema };
