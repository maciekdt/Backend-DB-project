echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Build your app"
sudo npm run start

echo "Run new PM2 action"
sudo cp /home/linux/ecosystem.json ecosystem.json
sudo pm2 start ecosystem.json