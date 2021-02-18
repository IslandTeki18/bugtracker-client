import bcrypt from "bcryptjs";

const users = [
  {
    username: "admin",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    username: "johndoe",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
