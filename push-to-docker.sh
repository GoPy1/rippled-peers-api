export REPO=quay.io/steven_/rippled-peers-api
docker tag rippled_peers_api $REPO:$CIRCLE_SHA
docker tag rippled_peers_api $REPO:$1
docker login --email=$DOCKER_EMAIL --username=$DOCKER_USERNAME --password=$DOCKER_PASSWORD quay.io
docker push $REPO:$CIRCLE_SHA
docker push $REPO:$1
