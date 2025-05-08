-- CreateTable
CREATE TABLE "CV" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "title" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "address" TEXT,
    "experiences_json" TEXT,
    "education_json" TEXT,
    "skills_json" TEXT,
    "languages_json" TEXT,
    "interests_json" TEXT,
    "custom_sections_json" TEXT,
    "defaultTemplate" TEXT NOT NULL DEFAULT 'modern',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT,
    "styles_json" TEXT NOT NULL,
    "layout" TEXT NOT NULL DEFAULT 'single',
    "html" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_key" ON "Template"("name");
