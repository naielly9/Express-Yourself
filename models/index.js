const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './blog.db',
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});


User.hasMany(Post);
Post.belongsTo(User);

sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado.');
});

module.exports = { sequelize, User, Post };

sequelize.sync().then(async () => {
  const bcrypt = require('bcrypt');
  const password = bcrypt.hashSync('default123', 10);

  await User.findOrCreate({
    where: { username: 'admin' },
    defaults: { password },
  });

  console.log('Usuário padrão criado.');
});
