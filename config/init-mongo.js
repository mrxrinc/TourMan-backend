db = db.getSiblingDB('tourman');
db.createUser({
  user: 'test',
  pwd: '',
  roles: [{ role: 'readWrite', db: 'tourman' }],
});
