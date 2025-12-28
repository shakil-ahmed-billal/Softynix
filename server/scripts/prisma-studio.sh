#!/bin/bash
# Script to run Prisma Studio with direct database connection
# This bypasses the PrismaPg adapter which doesn't work with Studio

# Set environment variable to disable adapter
export USE_PRISMA_ADAPTER=false

# Run Prisma Studio
npx prisma studio

