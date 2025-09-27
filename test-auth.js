const http = require('http');

// Function to test signup
function testSignup() {
  const options = {
    hostname: 'localhost',
    port: 8081,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const userData = {
    email: 'testuser@example.com',
    password: 'password123',
    name: 'Test User'
  };

  const req = http.request(options, (res) => {
    console.log('Signup Status Code:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Signup Response:', data);
      // If signup is successful, test login
      if (res.statusCode === 201) {
        testLogin(userData.email, userData.password);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Signup Error:', error);
  });

  req.write(JSON.stringify(userData));
  req.end();
}

// Function to test login
function testLogin(email, password) {
  console.log('\nTesting login with newly created user...');
  
  const options = {
    hostname: 'localhost',
    port: 8081,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const req = http.request(options, (res) => {
    console.log('Login Status Code:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Login Response:', data);
      try {
        const parsedResponse = JSON.parse(data);
        if (parsedResponse.token) {
          console.log('\nSuccess! Login was successful and token was received.');
        }
      } catch (e) {
        console.log('Could not parse response as JSON');
      }
    });
  });

  req.on('error', (error) => {
    console.error('Login Error:', error);
  });

  req.write(JSON.stringify({ email, password }));
  req.end();
}

// Run the tests
console.log('Testing signup and login API...');
testSignup();