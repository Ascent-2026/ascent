export const PRELOAD_ASSET_URLS: string[] = [
  "/tv-parts/tv-base_2.png",
  "/tv-parts/volume-dots.svg",
  "/tv-parts/volume-dial.svg",
  "/tv-parts/power-knob.svg",
  "/tv-parts/channels-bar.svg",
  "/tv-parts/power-indicator.svg",
  "/tv-parts/volume-knob.svg",
  "/tv-parts/TVFrame_main.svg",
  "/assets/homepage_grid.png",
  "/assets/star-small.png",
  "/assets/cloud-singleNew.png",
  "/assets/MainLogo.png",
  "/assets/star-middle.png",
  "/assets/cloud-multiple.png",
];

async function preloadOne(url: string): Promise<void> {
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (res.ok) await res.blob();
  } catch {
    // Ignore missing assets so preloading never blocks app startup.
  }
}

export async function preloadAssets(
  urls: string[],
  onProgress: (percent: number) => void,
): Promise<void> {
  if (urls.length === 0) {
    onProgress(100);
    return;
  }
  let done = 0;
  await Promise.all(
    urls.map(async (url) => {
      await preloadOne(url);
      done += 1;
      onProgress((done / urls.length) * 100);
    }),
  );
}
