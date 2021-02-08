set -x
set -e
VERSION=`node -pe "require('./package.json').version"`
docker build . -t sckmkny/app-1:$VERSION
