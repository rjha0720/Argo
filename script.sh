set -x
set -e
echo "### Docker build"
VERSION=`node -pe "require('./package.json').version"`
docker build . -t sckmkny/app-1:$VERSION
echo "### Docker push"
docker push sckmkny/app-1:$VERSION
echo "### Kubectl apply"
sed -i "s/IMAGE/sckmkny\/app-1:$VERSION/" k8s/app-1-01-deployment.yaml
kubectl apply -f k8s

