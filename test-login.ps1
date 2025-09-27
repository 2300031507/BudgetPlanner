$body = '{"email": "admin@example.com", "password": "password"}';
Invoke-RestMethod -Uri "http://localhost:8081/api/auth/login" -Method POST -ContentType "application/json" -Body $body;