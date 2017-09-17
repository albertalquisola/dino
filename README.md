# tra

# Run and Debug in development
**make sure to have docker installed**

# How to start tra
1. run `docker-compose up -d` (start tra and all dependent services)
2. run `docker exec -it tra bash` (jump inside the tra docker container)
3. run `npm run dev-start`
4. visit localhost:3000/errorTest (should see a predefined json error. if you do, were live!)

# How to start node inspector
1. run `docker exec -it tra bash` (jump inside the tra docker container)
2. run `node-inspector --no-preload`
3. visit localhost:8080 (node inspector server is running there)

# Docker

**building an image**
`docker build -t ${userName}/${repoName}:${tag} -f ${fileName} .`

**example**
`docker build -t albertalquisola/tra-core:0.0.1 -f Dockerfile.core .`

**how to push to dockerhub**
`docker push ${userName}/${repoName}:${tag}`

**example**
`docker push albertalquisola/tra-core:0.0.1`

# Database How Tos
**You will be prompted for a password so have it handy**
How to acccess inside the container
1. `docker exec -it tra bash`
2. `mysql -htra-db -uroot -p`

How to access outside the container
1. `mysql -h127.0.0.1 -uroot -p`

Running a migration or seed script
`mysql -htra-db -uroot -p < scripts/db/${nameOfScript}`

