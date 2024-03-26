-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Albums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL DEFAULT '1',

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistsToFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumsToFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoritesToTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistsToFavorites_AB_unique" ON "_ArtistsToFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistsToFavorites_B_index" ON "_ArtistsToFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumsToFavorites_AB_unique" ON "_AlbumsToFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumsToFavorites_B_index" ON "_AlbumsToFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToTracks_AB_unique" ON "_FavoritesToTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToTracks_B_index" ON "_FavoritesToTracks"("B");

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "Albums_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "Tracks_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "Tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Albums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistsToFavorites" ADD CONSTRAINT "_ArtistsToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistsToFavorites" ADD CONSTRAINT "_ArtistsToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumsToFavorites" ADD CONSTRAINT "_AlbumsToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumsToFavorites" ADD CONSTRAINT "_AlbumsToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToTracks" ADD CONSTRAINT "_FavoritesToTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToTracks" ADD CONSTRAINT "_FavoritesToTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
