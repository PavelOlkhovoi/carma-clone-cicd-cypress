export const createItemsDictionary = (items) => {
  let globalbereicheSet = new Set();
  let kenntnisseSet = new Set();
  let zielgruppenSet = new Set();

  for (let offer of items) {
    if (offer !== undefined && offer !== null) {
      if (offer.globalbereiche) {
        for (let g of offer.globalbereiche) {
          globalbereicheSet.add(g);
        }
      }
      if (offer.kenntnisse) {
        for (let k of offer.kenntnisse) {
          kenntnisseSet.add(k);
        }
      }
      if (offer.zielgruppen) {
        for (let z of offer.zielgruppen) {
          zielgruppenSet.add(z);
        }
      }
    }
  }

  const globalbereiche = Array.from(globalbereicheSet).sort();
  const kenntnisse = Array.from(kenntnisseSet).sort();
  const zielgruppen = Array.from(zielgruppenSet).sort();

  return { globalbereiche, kenntnisse, zielgruppen };
};
