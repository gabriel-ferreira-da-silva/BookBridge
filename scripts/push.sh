if [ "$1" = "--push" ] || [ "$1" = "-p" ]; then
    if [ -z "$2" ]; then
        echo "no commit message given"
        exit 1
    fi
    COMMIT_MSG="$2"
    BRANCH="$(git rev-parse --abbrev-ref HEAD)"
    git add .
    git commit -m "$COMMIT_MSG"
    git push -u origin "$BRANCH"
    exit 1
fi