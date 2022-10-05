docker stop con_forntend
docker rm con_forntend
docker rmi forntend
docker build -t forntend  .
docker run -d --name con_forntend -p 3000:3000 frontend
