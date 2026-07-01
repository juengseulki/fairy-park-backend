-- CreateTable
CREATE TABLE "ParkingHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParkingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParkingHistory_userId_parkingId_key" ON "ParkingHistory"("userId", "parkingId");

-- AddForeignKey
ALTER TABLE "ParkingHistory" ADD CONSTRAINT "ParkingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
