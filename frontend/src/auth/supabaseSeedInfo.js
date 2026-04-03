/**
 * Mirrors supabase/migrations/003_seed_demo_users.sql — login hints when Supabase is configured.
 * Password must match the SQL file.
 */
export const SUPABASE_SEED_DEMO_PASSWORD = 'CourseCopilotDemo2026!'

export const SUPABASE_SEED_ACCOUNTS = [
  { email: 'cc.student@coursecopilot.demo', role: 'student', label: 'Seed: Student' },
  { email: 'cc.university@coursecopilot.demo', role: 'university', label: 'Seed: University' },
  { email: 'cc.coordinator@coursecopilot.demo', role: 'coordinator', label: 'Seed: Coordinator' },
  { email: 'cc.professor@coursecopilot.demo', role: 'professor', label: 'Seed: Professor' },
  { email: 'cc.admin@coursecopilot.demo', role: 'admin', label: 'Seed: Admin' },
]
