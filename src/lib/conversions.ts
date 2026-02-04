export const convertBoxToPack = (boxes: number, packPerBox: number): number => {
  return boxes * packPerBox;
};

export const convertPackToBox = (packs: number, packPerBox: number): number => {
  return Math.floor(packs / packPerBox);
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
