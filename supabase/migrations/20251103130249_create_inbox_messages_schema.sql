/*
  # Create Inbox Messages Schema

  1. New Tables
    - `inbox_messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `order_id` (text) - Order ID reference
      - `assignment` (text) - Assignment title
      - `message` (text) - Message content
      - `from_name` (text) - Sender name
      - `from_avatar` (text) - Sender avatar URL
      - `date` (timestamptz) - Message date
      - `is_read` (boolean) - Read status
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `inbox_messages` table
    - Add policy for users to read their own messages
*/

CREATE TABLE IF NOT EXISTS inbox_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id text NOT NULL,
  assignment text NOT NULL,
  message text NOT NULL,
  from_name text NOT NULL,
  from_avatar text,
  date timestamptz DEFAULT now(),
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inbox_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own messages"
  ON inbox_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own messages"
  ON inbox_messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_inbox_messages_user_id ON inbox_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_inbox_messages_date ON inbox_messages(date DESC);