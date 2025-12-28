@echo off
REM Script to run Prisma Studio with direct database connection on Windows
REM This bypasses the PrismaPg adapter which doesn't work with Studio

REM Set environment variable to disable adapter
set USE_PRISMA_ADAPTER=false

REM Run Prisma Studio
npx prisma studio

