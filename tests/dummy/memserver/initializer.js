export default function(Models) {
  const { User } = Models;

  User.insert({ email: 'contact@izelnakri.com', username: 'izelnakri' });
}
