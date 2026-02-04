-- CreateTable
CREATE TABLE "coffee_quantity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity_pack" INTEGER NOT NULL DEFAULT 0,
    "pack_per_box" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coffee_quantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coffee_in" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity_box" INTEGER NOT NULL,
    "quantity_pack" INTEGER NOT NULL,
    "receiver" TEXT NOT NULL,
    "note" TEXT,
    "date_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coffee_in_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coffee_out" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity_pack" INTEGER NOT NULL,
    "sender" TEXT NOT NULL,
    "note" TEXT,
    "date_out" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coffee_out_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coffee_quantity_name_key" ON "coffee_quantity"("name");

-- CreateIndex
CREATE INDEX "coffee_in_product_id_idx" ON "coffee_in"("product_id");

-- CreateIndex
CREATE INDEX "coffee_in_date_in_idx" ON "coffee_in"("date_in");

-- CreateIndex
CREATE INDEX "coffee_out_product_id_idx" ON "coffee_out"("product_id");

-- CreateIndex
CREATE INDEX "coffee_out_date_out_idx" ON "coffee_out"("date_out");

-- AddForeignKey
ALTER TABLE "coffee_in" ADD CONSTRAINT "coffee_in_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "coffee_quantity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_out" ADD CONSTRAINT "coffee_out_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "coffee_quantity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
