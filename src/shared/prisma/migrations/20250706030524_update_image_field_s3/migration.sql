/*
  Warnings:

  - You are about to drop the `Callback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ColorsOnProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndividualOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCoordinates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelatedProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Slide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ColorsOnProducts" DROP CONSTRAINT "ColorsOnProducts_colorId_fkey";

-- DropForeignKey
ALTER TABLE "ColorsOnProducts" DROP CONSTRAINT "ColorsOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualOrder" DROP CONSTRAINT "IndividualOrder_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCoordinates" DROP CONSTRAINT "ProductCoordinates_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCoordinates" DROP CONSTRAINT "ProductCoordinates_relatedProductId_fkey";

-- DropForeignKey
ALTER TABLE "RelatedProducts" DROP CONSTRAINT "RelatedProducts_fromProductId_fkey";

-- DropForeignKey
ALTER TABLE "RelatedProducts" DROP CONSTRAINT "RelatedProducts_toProductId_fkey";

-- DropTable
DROP TABLE "Callback";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "ColorsOnProducts";

-- DropTable
DROP TABLE "IndividualOrder";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "Page";

-- DropTable
DROP TABLE "Product" CASCADE;

-- DropTable
DROP TABLE "ProductCoordinates";

-- DropTable
DROP TABLE "RelatedProducts";

-- DropTable
DROP TABLE "Slide";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "image_key" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "text" TEXT,
    "image" TEXT,
    "image_key" TEXT,
    "alias" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "text" TEXT,
    "image" TEXT NOT NULL,
    "image_key" TEXT NOT NULL,
    "images" TEXT[],
    "image_keys" TEXT[],
    "alias" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "related_products" (
    "id" SERIAL NOT NULL,
    "type" "ProductRelationType" NOT NULL,
    "from_product_id" INTEGER NOT NULL,
    "to_product_id" INTEGER NOT NULL,

    CONSTRAINT "related_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "image_key" TEXT NOT NULL,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors_on_products" (
    "color_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" TEXT NOT NULL,

    CONSTRAINT "colors_on_products_pkey" PRIMARY KEY ("color_id","product_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "payment" "PaymentType" NOT NULL DEFAULT 'CASH',
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price_at_order" TEXT NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "callbacks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "callbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individual_orders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "individual_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slides" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "sub_title" TEXT,
    "informer_title" TEXT,
    "button_text" TEXT,
    "href" TEXT,
    "image_src" TEXT NOT NULL,
    "image_key" TEXT,
    "informer_description" TEXT,

    CONSTRAINT "slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "alias" TEXT NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_coordinates" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "related_product_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_alias_key" ON "categories"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "products_alias_key" ON "products"("alias");

-- CreateIndex
CREATE INDEX "products_alias_idx" ON "products"("alias");

-- CreateIndex
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "related_products_from_product_id_to_product_id_type_key" ON "related_products"("from_product_id", "to_product_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "pages_alias_key" ON "pages"("alias");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_products" ADD CONSTRAINT "related_products_from_product_id_fkey" FOREIGN KEY ("from_product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_products" ADD CONSTRAINT "related_products_to_product_id_fkey" FOREIGN KEY ("to_product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_products" ADD CONSTRAINT "colors_on_products_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_products" ADD CONSTRAINT "colors_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individual_orders" ADD CONSTRAINT "individual_orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_coordinates" ADD CONSTRAINT "product_coordinates_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_coordinates" ADD CONSTRAINT "product_coordinates_related_product_id_fkey" FOREIGN KEY ("related_product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
