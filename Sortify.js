(async function () {
  while (
    !Spicetify.React ||
    !Spicetify.ReactDOM ||
    !Spicetify.Platform?.PlaylistAPI ||
    !Spicetify.CosmosAsync ||
    !Spicetify.ContextMenu ||
    !Spicetify.URI
  ) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  async function sortPlaylistByArtist(uris) {
    try {
      const playlistUri = uris[0];
      const { items } = await Spicetify.Platform.PlaylistAPI.getContents(
        playlistUri,
        { limit: 9999999 }
      );

      if (!items?.length) return;

      const sorted = [...items].sort((a, b) =>
        (a.artists?.[0]?.name ?? "").localeCompare(
          b.artists?.[0]?.name ?? "",
          "de",
          { sensitivity: "base" }
        )
      );

      const toRemove = items.map(({ uri, uid }) => ({ uri, uid }));
      for (let i = 0; i < toRemove.length; i += 100) {
        await Spicetify.Platform.PlaylistAPI.remove(
          playlistUri,
          toRemove.slice(i, i + 100)
        );
      }

      const sortedUris = sorted.map((t) => t.uri);
      for (let i = 0; i < sortedUris.length; i += 100) {
        await Spicetify.Platform.PlaylistAPI.add(
          playlistUri,
          sortedUris.slice(i, i + 100),
          { after: "end" }
        );
      }
    } catch {}
  }

  new Spicetify.ContextMenu.Item(
    "Nach Interpret sortieren",
    sortPlaylistByArtist,
    (uris) => uris?.length === 1 && Spicetify.URI.isPlaylistV1OrV2(uris[0]),
    "artist"
  ).register();
})();
