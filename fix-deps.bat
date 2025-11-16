@echo off
echo Fixing dependency issues...
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
echo Dependencies fixed! Now run: npm start
