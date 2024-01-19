db = db.getSiblingDB('tourman');
db.createUser({
  user: 'mrxrinc',
  pwd: 'mrxrinc.com',
  roles: [{ role: 'readWrite', db: 'tourman' }],
});
