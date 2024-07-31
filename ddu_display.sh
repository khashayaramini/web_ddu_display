#!/bin/bash

BACK=/home/raven/Documents/build-ddu_display-Desktop_Qt_6_6_1_GCC_64bit-Release/ddu_display
FRONT=/home/raven/Documents/web_ddu_display/dist/ddu_display-0.1.0.AppImage
# Start the two binaries in the background
${FRONT} &
PID1=$!

${BACK} &
PID2=$!

# Function to kill the binaries on script exit
cleanup() {
    echo "Stopping binaries..."
    kill $PID1 $PID2
}

# Trap the EXIT signal to run the cleanup function
trap cleanup EXIT

# Keep the script running
wait

