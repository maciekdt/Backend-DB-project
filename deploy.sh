echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Build your app"
npm run build
sudo npm run start-prod

echo "Run new PM2 action"
sudo pm2 start ecosystem.json