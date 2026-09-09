function checkAge(age) {
  const promise = new Promise((resolve, reject) => {
    if (age >= 18) {
      resolve('Access granted');
    } else {
      reject('Access denied');
    }
  });

  return promise;
}

checkAge(10)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

Promise.resolve(10)
  .then((num) => num * 2)
  .then((num) => num + 5)
  .then((result) => console.log(result));

Promise.resolve(5)
  .then((num) => num * 2)
  .then((num) => num + 20)
  .then((num) => num + 5)
  .then((result) => console.log(result));

function getUser() {
  return new Promise((resolve, reject) => {
    const chance = Math.random();

    setTimeout(() => {
      if (chance <= 0.8) {
        resolve({
          id: 1,
          name: 'John'
        });
      } else {
        reject('Error: Data cannot be Fetched');
      }
    }, 2000);
  });
}

getUser()
  .then((user) => console.log(user))
  .catch((error) => console.log(error));

function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 6666) {
        resolve({
          id: 1,
          username: 'admin'
        });
      } else {
        reject('Invalid credentials');
      }
    }, 2000);
  });
}

function getProfile(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        email: 'johndoe@jmail.com',
        contact: 2222222222,
        picture: 'urlofjohnpicture',
        bio: 'I beleive what I can.'
      });
    }, 2000);
  });
}

login('admin', 6666)
  .then((result) => {
    console.log('right credentials');
    return getProfile(result.id);
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

async function fetchUser(username, password) {
  try {
    const user = await login(username, password);

    const profile = await getProfile(user.id);

    console.log(profile);
  } catch (error) {
    if (error === 'Invalid credentials') {
      console.log('Please check your username and password');
    } else {
      console.log('Unexpected error. Please try again later.');
    }
  }
}

fetchUser('admin', 666);

async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    console.log(users.map((user) => user.name));
  } catch (error) {
    console.log('Failed:', error);
  }
}
getUsers();

function getCustomer() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Holy Knight'), 1000);
  });
}

function getProducts() {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { name: 'Bag', priceCents: 799 },
          { name: 'Pen', priceCents: 109 },
          { name: 'Notebook', priceCents: 299 }
        ]),
      3000
    );
  });
}

async function speedTest1() {
  const customer = await getCustomer();
  console.log(customer);
  const products = await getProducts();
  console.log(products);
}

async function speedTest2() {
  const [customer, products] = await Promise.all([
    getCustomer(),
    getProducts()
  ]);
  console.log(customer);
  console.log(products);
}

speedTest1();
speedTest2();

function getCart() {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { name: 'Notebook', quantity: 2 },
          { name: 'Pen', quantity: 5 }
        ]),
      3000
    );
  });
}

async function loadPage() {
  try {
    const [user, products, cart] = await Promise.all([
      getCustomer(),
      getProducts(),
      getCart()
    ]);

    const productItem = products.map((item) => item.name);
    const cartItem = cart.map((item) => item.name);

    console.log(productItem, cartItem);
    if (cartItem.every((item) => productItem.includes(item))) {
      const cart = cartItem
        .map(
          (item) => `-${item}
      `
        )
        .join('');
      console.log(`
      User: ${user}

      Cart: 
      ${cart}
      `);
    } else {
      console.log('I messed Up.');
    }
  } catch (error) {
    console.log(error);
  }
}

loadPage();
