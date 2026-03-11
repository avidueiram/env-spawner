#!/bin/bash

source ./scripts/utils.sh
project=$1
script_name=$(basename "$0")
script_action=$(echo "$script_name" | cut -d'.' -f1)
start_time=$(date +%s)

print_start
check_args "$project"

echo "[$script_name]▶ Starting environment..."
if ! docker compose -p "$project" -f "compose.yaml" -f "environments/$project.yaml" up -d; then
    print_error "Failed to start environment"
fi

print_finish