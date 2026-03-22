import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { oauthAccountTable } from '../schema/oauth'
import { sessionTable } from '../schema/session'
import { userTable } from '../schema/user'

// ─── User Schemas ────────────────────────────────────────────

export const insertUserSchema = createInsertSchema(userTable, {
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').optional(),
  avatarUrl: z.string().url('Invalid URL').optional(),
})

export const selectUserSchema = createSelectSchema(userTable)

export type InsertUser = z.infer<typeof insertUserSchema>
export type SelectUser = z.infer<typeof selectUserSchema>

// ─── Session Schemas ─────────────────────────────────────────

export const insertSessionSchema = createInsertSchema(sessionTable, {
  expiresAt: z.date(),
})

export const selectSessionSchema = createSelectSchema(sessionTable)

export type InsertSession = z.infer<typeof insertSessionSchema>
export type SelectSession = z.infer<typeof selectSessionSchema>

// ─── OAuth Account Schemas ───────────────────────────────────

export const insertOAuthAccountSchema = createInsertSchema(oauthAccountTable, {
  providerId: z.string().min(1, 'Provider ID is required'),
  providerUserId: z.string().min(1, 'Provider User ID is required'),
})

export const selectOAuthAccountSchema = createSelectSchema(oauthAccountTable)

export type InsertOAuthAccount = z.infer<typeof insertOAuthAccountSchema>
export type SelectOAuthAccount = z.infer<typeof selectOAuthAccountSchema>
