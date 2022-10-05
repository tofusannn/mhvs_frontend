docker stop con_forntend
docker rm con_forntend
docker rmi registry.gitlab.com/sarayut.siriwi/mhvs_frontend
# docker build -t forntend  .
# docker run -d --name con_forntend -p 3000:3000 frontend

docker pull registry.gitlab.com/sarayut.siriwi/mhvs_frontend
docker run -d --name con_forntend -p 3000:3000 registry.gitlab.com/sarayut.siriwi/mhvs_frontend