-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "position_x" DOUBLE PRECISION NOT NULL,
    "position_y" DOUBLE PRECISION NOT NULL,
    "color" TEXT DEFAULT 'white',

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "target" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_source_fkey" FOREIGN KEY ("source") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_target_fkey" FOREIGN KEY ("target") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
