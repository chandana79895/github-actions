#!/bin/bash

# Update the version
npm version patch --no-git-tag-version

# Commit the changes (optional)
git add package.json package-lock.json
git commit -m "Bump version to $(node -p "require('./package.json').version")"

# Push changes to the repository (optional)
git push origin version-bumping-check