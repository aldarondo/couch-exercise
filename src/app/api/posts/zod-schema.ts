import { z } from 'zod';

export default z.object({
  authorId: z.string().nullable(),
});
