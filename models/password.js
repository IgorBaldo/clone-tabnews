import bcryptjs from "bcryptjs";

const pepper = process.env.PEPPER || "pepper";

async function hash(password) {
  const rounds = getNumberOfRounds();

  return await bcryptjs.hash(getPasswordWithPepper(password), rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

function getPasswordWithPepper(password) {
  password += pepper;
  return password;
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(
    getPasswordWithPepper(providedPassword),
    storedPassword,
  );
}

const password = {
  hash,
  compare,
};

export default password;
