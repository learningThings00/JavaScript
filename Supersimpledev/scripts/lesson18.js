const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();

fetch('https://supersimplebackend.dev/greeting')
  .then((response) => response.text())
  .then((ans) => console.log(ans));

async function getGreeting() {
  const response = await fetch('https://supersimplebackend.dev/greeting');
  const greet = await response.text();
  console.log(greet);
}

getGreeting();

async function sendGreeting() {
  const response = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'spider man' })
  });

  const answer = await response.text();
  console.log(answer);
}

sendGreeting();

async function getAmazon() {
  try {
    const response = await fetch('https://amazon.com');
    const get = await response.json();
    console.log(get);
  } catch (error) {
    console.log(error);
    console.log('CORS error. Your request was blocked by the backend.');
  }
}
getAmazon();

async function sendEmpty() {
  try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      }
    });

    if (response.status >= 400) {
      throw response;
    }
  } catch (error) {
    if (error.status === 400) {
      console.log(await error.json());
    } else {
      console.log('Network error. Please try again later.');
    }
  }
}

sendEmpty();
