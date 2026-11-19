// Plain-language definitions for technical terms used on About and Research pages.
// Definitions explain general terms; any Reef Support detail comes from CONTENT.md.
export type Term = { id: string; term: string; def: string };

export const terms: Record<string, Term> = {
  segmentation: {
    id: 'segmentation',
    term: 'Image segmentation',
    def: 'Labelling every part of a photo by what it shows. Coral AI labels regions of a reef photo as coral type, algae, rubble or sand, so the share of each can be measured from the image.',
  },
  transect: {
    id: 'transect',
    term: 'Transect',
    def: 'A fixed line along a reef that divers photograph or record at set points, so the same stretch can be compared between surveys.',
  },
  photogrammetry: {
    id: 'photogrammetry',
    term: '3D photogrammetry',
    def: 'Building a 3D model from many overlapping photos. In the Colombia project a twin-camera rig captured about 1,500 photos per dive, which were processed into 3D reef models.',
  },
  superpixel: {
    id: 'superpixel',
    term: 'Superpixels',
    def: 'Small groups of neighbouring pixels with similar colour and texture. Labelling these groups instead of single pixels can reduce the amount of hand labelling a segmentation model needs.',
  },
  rugosity: {
    id: 'rugosity',
    term: 'Rugosity',
    def: 'A measure of how uneven a reef surface is compared with a flat surface of the same size. It is a common way to describe reef structure and to track how restored sites develop.',
  },
  blueCarbon: {
    id: 'blue-carbon',
    term: 'Blue carbon',
    def: 'Carbon taken up and stored by coastal ecosystems such as mangroves. Mangrove AI estimates growth and carbon uptake from field records, and these estimates are still being calibrated with partner data.',
  },
  inSitu: {
    id: 'in-situ',
    term: 'In-situ data',
    def: 'Measurements taken in the water or on site, rather than from a satellite. In our projects this collection is done by partners, for example with RanMarine Technology vessels.',
  },
  satellite: {
    id: 'satellite-products',
    term: 'Satellite water quality products',
    def: 'Maps and values of water quality derived from Copernicus satellite data. In our projects these come from Water Insight B.V.; Reef Support integrates them with field data.',
  },
  nrr: {
    id: 'nrr',
    term: 'Nature Restoration Regulation',
    def: 'An EU regulation under which member states plan the restoration of ecosystems, including coastal ones, and report on their condition.',
  },
  wfd: {
    id: 'wfd',
    term: 'Water Framework Directive',
    def: 'The EU directive under which member states assess and report the ecological status of rivers, lakes and coastal waters.',
  },
};

export const pick = (...keys: (keyof typeof terms)[]) => keys.map((k) => terms[k]);
