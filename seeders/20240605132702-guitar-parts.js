const { faker } = require('@faker-js/faker');
('use strict');

const guitarManufacturers = [
  'Cort',
  'Ibanez',
  'Yamaha',
  'Gibson',
  'Fligth',
  'Fender',
  'Belluchi',
  'Martinez',
  'Homage',
  'Fabio',
  'Epiphone',
  'Hohner',
  'Boss',
  'VOX',
  'Marshall',
  'Orange',
  'Silvertone',
  'Roland',
  'DiMarzio',
  'Seymour Duncan',
  'Aguilar',
];
const partsManufacturers = [
  "Микрофоны",
  "Электрогитары",
  "Бас-гитары",
  "Акустические гитары",
  "Барабанные установки",
  "Клавишные",
  "Микшерные пульты",
  "Аудио интерфейсы",
  "Звукосниматели",
  "Педали",
  "Аксессуары",
  "Струны",
  "Усилители для гитар",
];
const musicInstrumentImages = [

  "https://photo.jazz-shop.ru/4/9/49382/40828.500.webp",
  "https://photo.jazz-shop.ru/5/6/56811/72565.500.webp",
  "https://photo.jazz-shop.ru/7/6/76188/111535.500.webp",
  "https://photo.jazz-shop.ru/7/6/76189/111537.500.webp",
  "https://photo.jazz-shop.ru/5/2/52809/47152.500.webp",
  "https://photo.jazz-shop.ru/7/4/74427/107847.500.webp",
  "https://photo.jazz-shop.ru/7/4/74858/108822.500.webp",
  "https://photo.jazz-shop.ru/6/8/68598/90952.500.webp",
  "https://photo.jazz-shop.ru/5/6/56822/69595.500.webp",
  "https://photo.jazz-shop.ru/7/5/75041/109219.500.webp",
  "https://photo.jazz-shop.ru/7/6/7625/6102.500.webp",
  "https://photo.jazz-shop.ru/6/9/69527/97846.500.webp",
  "https://photo.jazz-shop.ru/6/8/68631/91204.500.webp",
  "https://photo.jazz-shop.ru/6/8/68484/90474.500.webp",
  "https://photo.jazz-shop.ru/5/3/53211/48338.500.webp",
  "https://photo.jazz-shop.ru/7/2/72546/104119.500.webp",
  "https://photo.jazz-shop.ru/7/3/73099/105263.500.webp",
  "https://photo.jazz-shop.ru/2/7/27376/20720.500.webp",

];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'GuitarParts',
      [...Array(100)].map(() => ({
        guitar_manufacturer:
          guitarManufacturers[
            Math.floor(Math.random() * guitarManufacturers.length)
          ],
        parts_manufacturer:
          partsManufacturers[
            Math.floor(Math.random() * partsManufacturers.length)
          ],
        price: faker.random.numeric(5),
        name: faker.lorem.sentence(2),
        description: faker.lorem.sentence(10),
       
        images: `${JSON.stringify(
          musicInstrumentImages.sort(() => Math.random() - 0.5)
            .slice(0, 3)
        )}`,
        
        vendor_code: faker.internet.password(),
        in_stock: faker.random.numeric(1),
        bestseller: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.random.numeric(3),
        compatibility: faker.lorem.sentence(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('GuitarParts', null, {});
  },
};

