-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN DEFAULT false,
ADD COLUMN     "verificationToken" TEXT,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3);
