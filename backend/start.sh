#! /usr/bin/env bash
set -e

# If there's a pre-start.sh script in the specified directory, run it before starting
PRE_START_PATH=app/pre-start.sh
echo "Checking for script $PRE_START_PATH"
if [ -f $PRE_START_PATH ] ; then
    echo "Running script $PRE_START_PATH"
    pipenv run "$PRE_START_PATH"
else
    echo "There is no script $PRE_START_PATH"
fi
