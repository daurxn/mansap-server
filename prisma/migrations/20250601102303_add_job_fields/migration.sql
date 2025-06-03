-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "applicationDeadline" TIMESTAMP(3),
ADD COLUMN     "companyInfo" TEXT,
ADD COLUMN     "isRemote" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "responsibilities" TEXT;
