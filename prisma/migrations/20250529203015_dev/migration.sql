-- CreateTable
CREATE TABLE "Uploads" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Uploads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
