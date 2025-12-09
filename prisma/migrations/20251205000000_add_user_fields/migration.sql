-- AlterTable
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT,
ADD COLUMN IF NOT EXISTS "resetPasswordToken" TEXT,
ADD COLUMN IF NOT EXISTS "resetPasswordExpires" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_resetPasswordToken_key" ON "User"("resetPasswordToken");










