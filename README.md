# tddnode

Run NPM Intall

add .env to Project

To run Tests: npm run test:unit

---------------------------------
tracking endpoints :

-Start Tracking
POST http://localhost:8080/api/start
Body:{"name": "abc"}

-Stop Tracking
POST http://localhost:8080/api/stop
Body:{"name": "abc"}

---------------------------------
report endpoints

-List All Projects
GET http://localhost:8080/api/list-all

-List Project Details
GET http://localhost:8080/api/list-detail?name=abc


