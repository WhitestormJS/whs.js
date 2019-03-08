git add -A
git commit --amend --no-edit
GIT_LAST_VERSION=$(git describe --tags $(git rev-list --tags --max-count=1))
git tag -d $GIT_LAST_VERSION
git tag $GIT_LAST_VERSION
