-- メタクリ創造性診断：レポート公開機能用のカラム追加
-- Supabase SQL Editor で実行してください

-- afflatus_responsesテーブルに新しいカラムを追加
ALTER TABLE afflatus_responses
ADD COLUMN IF NOT EXISTS public_uuid UUID DEFAULT NULL,
ADD COLUMN IF NOT EXISTS report_html TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS report_pdf_url TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS report_published_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- public_uuidにユニーク制約を追加（NULLは複数許可）
CREATE UNIQUE INDEX IF NOT EXISTS idx_afflatus_responses_public_uuid
ON afflatus_responses (public_uuid)
WHERE public_uuid IS NOT NULL;

-- 確認用クエリ
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'afflatus_responses'
ORDER BY ordinal_position;
