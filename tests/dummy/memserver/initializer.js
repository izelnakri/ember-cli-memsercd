export default function(Models) {
  const { User } = Models;

  User.insert({ email: 'izelnakri@hotmail.com', username: 'izelnakri' });
}
