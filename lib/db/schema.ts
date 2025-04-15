import type { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  foreignKey,
  boolean,
  sql,
  index,
  integer,
  decimal,
  pgEnum,
  serial,
} from 'drizzle-orm/pg-core';

export const user = pgTable('User', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable('Chat', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  createdAt: timestamp('createdAt').notNull(),
  title: text('title').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id),
  visibility: varchar('visibility', { enum: ['private'] })
    .notNull()
    .default('private'),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable('Message', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  chatId: uuid('chatId')
    .notNull()
    .references(() => chat.id),
  role: varchar('role').notNull(),
  content: json('content').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

export type Message = InferSelectModel<typeof message>;

export const vote = pgTable(
  'Vote',
  {
    chatId: uuid('chatId')
      .notNull()
      .references(() => chat.id),
    messageId: uuid('messageId')
      .notNull()
      .references(() => message.id),
    isUpvoted: boolean('isUpvoted').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  },
);

export type Vote = InferSelectModel<typeof vote>;

export const document = pgTable(
  'Document',
  {
    id: uuid('id').notNull().defaultRandom(),
    createdAt: timestamp('createdAt').notNull(),
    title: text('title').notNull(),
    content: text('content'),
    kind: varchar('text', { enum: ['text', 'code', 'image', 'sheet'] })
      .notNull()
      .default('text'),
    userId: uuid('userId')
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdAt] }),
    };
  },
);

export type Document = InferSelectModel<typeof document>;

export const suggestion = pgTable(
  'Suggestion',
  {
    id: uuid('id').notNull().defaultRandom(),
    documentId: uuid('documentId').notNull(),
    documentCreatedAt: timestamp('documentCreatedAt').notNull(),
    originalText: text('originalText').notNull(),
    suggestedText: text('suggestedText').notNull(),
    description: text('description'),
    type: varchar('type', { enum: ['suggestion', 'importance'] })
      .notNull()
      .default('suggestion'),
    isResolved: boolean('isResolved').notNull().default(false),
    userId: uuid('userId')
      .notNull()
      .references(() => user.id),
    createdAt: timestamp('createdAt').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    documentRef: foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [document.id, document.createdAt],
    }),
  }),
);

export type Suggestion = InferSelectModel<typeof suggestion>;

export const votingTypeEnum = pgEnum("voting_type", [
  "normal",
  "youth_council",
  "referendum",
]);

export const votingStatusEnum = pgEnum("voting_status", [
  "draft",
  "active",
  "completed",
  "cancelled",
]);

export const proposalStatusEnum = pgEnum("proposal_status", [
  "pending",
  "approved",
  "rejected",
]);

export const localGovernments = pgTable(
  "local_governments",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 50 }).notNull().unique(),
    description: text("description"),
    bannerUrl: text("banner_url"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    codeIdx: index("local_governments_code_idx").on(table.code),
  })
);

export const votings = pgTable(
  "votings",
  {
    id: serial("id").primaryKey(),
    localGovernmentId: integer("local_government_id")
      .references(() => localGovernments.id)
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    type: votingTypeEnum("type").notNull(),
    status: votingStatusEnum("status").default("draft").notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    totalVotes: integer("total_votes").default(0).notNull(),
    totalProposals: integer("total_proposals").default(0).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    lgIdIdx: index("votings_lg_id_idx").on(table.localGovernmentId),
    statusIdx: index("votings_status_idx").on(table.status),
    dateIdx: index("votings_date_idx").on(table.startDate, table.endDate),
  })
);

export const proposals = pgTable(
  "proposals",
  {
    id: serial("id").primaryKey(),
    votingId: integer("voting_id")
      .references(() => votings.id)
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    performer: varchar("performer", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    estimatedCost: decimal("estimated_cost", { precision: 10, scale: 2 }).notNull(),
    status: proposalStatusEnum("status").default("pending").notNull(),
    votes: integer("votes").default(0).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    telephone: varchar("telephone", { length: 50 }).notNull(),
    notifyUpdates: boolean("notify_updates").default(false).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    votingIdIdx: index("proposals_voting_id_idx").on(table.votingId),
    statusIdx: index("proposals_status_idx").on(table.status),
  })
);

export const votes = pgTable(
  "votes",
  {
    id: serial("id").primaryKey(),
    proposalId: integer("proposal_id")
      .references(() => proposals.id)
      .notNull(),
    voterId: varchar("voter_id", { length: 255 }).notNull(), // Estonian ID code
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    proposalIdIdx: index("votes_proposal_id_idx").on(table.proposalId),
    voterIdIdx: index("votes_voter_id_idx").on(table.voterId),
    uniqueVote: index("votes_unique_vote_idx").on(table.proposalId, table.voterId),
  })
);
