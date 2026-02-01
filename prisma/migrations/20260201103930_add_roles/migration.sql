-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'COURT_MANAGER');

-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('CAPTAIN', 'MANAGER', 'MEMBER', 'SUB');

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "role" "TeamRole" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
