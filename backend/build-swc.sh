#!/bin/bash

# Clean dist directory
rm -rf ./dist

# Run SWC
pnpm exec swc src -d dist \
  --config-file .swcrc \
  --ignore '**/*.spec.ts' \
  --ignore '**/*.test.ts'
