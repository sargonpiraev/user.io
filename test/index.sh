#!/usr/bin/env bash

STATUS_URL="http://selenium:4444/wd/hub/status"

# set -e: exit asap if a command exits with a non-zero status
set -e

echo "Waiting for Selenium Hub to be ready..."

# Selenium <= 3.3.1 then: while ! curl -s "${SEL_STATUS_URL}" | jq '.status' | grep "13"; do
# SUCESS_CMD="jq .status | grep 13"

# Selenium >= 3.5.0 then: while ! curl -s "${SEL_STATUS_URL}" | jq '.status' | grep "0"; do
SUCESS_CMD="jq .status | grep 0"

while ! curl -s "${STATUS_URL}" | sh -c "${SUCESS_CMD}"; do
  echo -n '.'
  sleep 1
done

echo "Selenium is ready"

npm start