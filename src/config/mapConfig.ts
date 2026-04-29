// Shared 2D map configuration
// Image: 3548x1774, adjust tile counts to match your server map data
export const MAP_IMAGE_W = 3548;
export const MAP_IMAGE_H = 1774;
export const MAP_IMAGE_URL = '/assets/map_bg.png';

export function getTileSize(widthTiles: number, heightTiles: number) {
  return {
    tileW: MAP_IMAGE_W / widthTiles,
    tileH: MAP_IMAGE_H / heightTiles,
  };
}
