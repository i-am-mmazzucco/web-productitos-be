db.createUser({
  user: 'productitos',
  pwd: 'productitos',
  roles: [
    {
      role: 'readWrite',
      db: 'sentiment',
    },
  ],
});
