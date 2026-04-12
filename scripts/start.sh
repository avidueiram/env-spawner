#!/bin/bash

source ./scripts/utils.sh
project=$1
environment=$2
script_name=$(basename "$0")
script_action=$(echo "$script_name" | cut -d'.' -f1)
start_time=$(date +%s)

print_start
check_args "$project"
check_args "$environment"

source "environments/.env.$environment"

echo "[$script_name]▶ Starting environment..."
if ! docker compose \
    -p "$project" \
    --env-file "environments/.env.$environment" \
    -f "compose.yaml" \
    -f "environments/$project.yaml" \
    up -d; then
    print_error "Failed to start environment"
fi

echo "[$script_name]▶ Opening environment hub in browser..."
if ls /Applications | grep -qi "Brave Browser"; then
    open -na "Brave Browser" --args --new-window "http://localhost:${ENVIRONMENT_HUB_PORT}/"
else
    open -na "Google Chrome" --args --new-window "http://localhost:${ENVIRONMENT_HUB_PORT}/"
fi

if [ -f "environments/$project.postcompose.sh" ]; then
    echo "[$script_name]▶ Running postcompose script..."
    source "environments/$project.postcompose.sh"
else
    echo "[$script_name]▶ No postcompose script found"
fi

print_finish