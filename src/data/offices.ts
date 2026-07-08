export type Office = {
  block: string;
  floor: string;
  area: number;
  workplaces: string;
  ready: string;
  layout: string;
  title: string;
  features: string[];
  presentationFile: string;
  
};

export const offices: Office[] = [
  {
    block: 'Trilliant',
    floor: '13',
    area: 1674,
    workplaces: 'до 250 рабочих мест',
    ready: 'Готов к въезду',
    layout: 'планировка смешанная, с мебелью',
    title: 'Офисный блок 1674 м², 13 этаж',
    features: [
      '1674 м²',
      'подходит для большой компании',
      'Полностью готовый к въезду офис',
      'меблированный, включая рабочие места',
      'преимущественно открытая планировка'
    ],
    presentationFile: '/files/placeholder-presentation-1.pdf'
    
  },
  {
    block: 'Trilliant',
    floor: '7',
    area: 128,
    workplaces: 'до 20 рабочих мест',
    ready: 'Готов к въезду',
    layout: 'открытая с одной переговорной',
    title: 'Офисный блок 128 м², 7 этаж',
    features: [
      '128 м²',
      'переговорная и open space',
      'кухня и раковина',
      'удобно для компании до 20 человек',
          ],
    presentationFile: '/files/placeholder-presentation-2.pdf'
  },
  {
    block: 'Trilliant',
    floor: '8',
    area: 223,
    workplaces: 'до 30 рабочих мест',
    ready: 'Готов к въезду',
    layout: 'смешанная',
    title: 'Офисный блок 223 м², 8 этаж',
    features: [
      '223 м²',
      'два соседних блока',
      'четыре переговорные или кабинета, опен-спейс и кухня',
          ],
    presentationFile: '/files/placeholder-presentation-3.pdf'
  }
];

