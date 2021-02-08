set -x
set -e
VERSION=`node -pe "require('./package.json').version"`
# docker build . -t sckmkny/app-1:$VERSION
# docker push sckmkny/app-1:$VERSION
sed "s/IMAGE/sckmkny\/app-1:$VERSION/" k8s/app-1-01-deployment.yaml
