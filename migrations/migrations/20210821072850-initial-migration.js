const PROVIDERS = [
  { name: 'Provider1' },
  { name: 'Provider2' },
  { name: 'Provider3' },
  { name: 'Provider4' },
  { name: 'Provider5' },
];

const CLIENTS = [
  {
    name: 'test user',
    email: 'test@seeded.com',
    phone: '+7 999 999 999',
    providers: [],
  },
  {
    name: 'test user 1',
    email: 'test1@seeded.com',
    phone: '+7 999 999 999',
    providers: [],
  },
  {
    name: 'test user 2',
    email: 'test2@seeded.com',
    phone: '+7 999 999 999',
    providers: [],
  },
  {
    name: 'test user 3',
    email: 'test3@seeded.com',
    phone: '+7 999 999 999',
    providers: [],
  },
];

module.exports = {
  async up(db) {
    await db.collection('providers').insertMany(PROVIDERS);
    await db.collection('clients').insertMany(CLIENTS);
  },

  async down(db) {
    await db.collection('providers').deleteMany({});
    await db.collection('clients').deleteMany({});
  },
};
