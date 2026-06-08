const { z } = require('zod');

const noteCreateSchema = z.object({
  title: z.string().optional(),
  encryptedContent: z.string().min(1, 'Encrypted content is required'),
  iv: z.string().min(1, 'IV is required'),
  authTag: z.string().min(1, 'Auth tag is required'),
});

module.exports = {
  noteCreateSchema,
};
