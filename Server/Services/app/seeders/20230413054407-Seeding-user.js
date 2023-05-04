'use strict';

const { formatHash } = require('../helpers/bcrypt');
const { slug } = require('../helpers/slug');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'jun',
      email: "jun@mail.com",
      password: formatHash("jun123"),
      role: "admin",
      phoneNumber: "08080800808",
      address: "jakarta selatan",
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('Categories', [
      {
        name: "Ekonomi",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Politik",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Finance",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])

    await queryInterface.bulkInsert('News', [
      {
        title: 'Perang rusia ukraina',
        slug: slug('Perang rusia ukraina'),
        content: 'Necessary ye contented newspaper zealously breakfast he prevailed. Melancholy middletons yet understood decisively boy law she. Answer him easily are its barton little. Oh no though mother be things simple itself. Oh be me, sure wise sons, no. Piqued ye of am spirit regret. Stimulated discretion impossible admiration in particular conviction up.',
        imgUrl: 'https://plus.unsplash.com/premium_photo-1673543757269-8de6ca811cec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        CategoryId: 1,
        UserMongoId: "6451d1fd86333e106600843d",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Politik Dunia',
        slug: slug('Politik Dunia'),
        content: 'Politik (serapan dari bahasa Belanda: politiek) adalah proses pembentukan dalam masyarakat yang antara lain berwujud proses pembuatan keputusan, khususnya dalam negara. Pengertian ini adalah upaya penggabungan antara berbagai definisi yang berbeda mengenai hakikat Jabatan politik yang dikenal ',
        imgUrl: 'https://plus.unsplash.com/premium_photo-1673543757272-033510c39f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        CategoryId: 2,
        UserMongoId: "6451d1fd86333e106600843d",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'World War in rusia',
        slug: slug('World War in rusia'),
        content: 'A world war is an international conflict which involves all or most of the worlds major powers. Conventionally, the term is reserved for two major international conflicts that occurred during the first half of the 20th century',
        imgUrl: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        CategoryId: 2,
        UserMongoId: "6451d1fd86333e106600843d",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Inflasi global in USA',
        slug: slug('Inflasi global in USA'),
        content: 'Global Finance is an English-language monthly financial magazine. The magazine was founded in 1987 by Joseph D. Giarraputo, the founder and former publisher of Venture, Carl G. Burgen, Stephan Spahn, H. Allen Fernald, and Paolo Panerai, and covers the topic of financial globalization.',
        imgUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        CategoryId: 3,
        UserMongoId: "6451d1fd86333e106600843d",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])

    await queryInterface.bulkInsert('Tags', [
      {
        NewsId: 1,
        name: '#Viral',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        NewsId: 1,
        name: '#Ekonomi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        NewsId: 2,
        name: '#SavePolitik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        NewsId: 3,
        name: '#HumanPower',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        NewsId: 4,
        name: '#SaveWorld',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        NewsId: 3,
        name: '#SaveWorld',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
