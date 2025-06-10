const bcrypt = require('bcrypt');
const contraseña = 'admin1234';

bcrypt.hash(contraseña, 10).then(hash => {
  console.log('Contraseña cifrada:', hash);
});