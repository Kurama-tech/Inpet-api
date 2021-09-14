# By Meer Sawood <msawood@redhat.com> 
# uses uib node.js 14 image as base and pm2 as the server
FROM registry.access.redhat.com/ubi8/nodejs-14
USER 0
WORKDIR  /tmp/src
RUN chown -R 1001:0 /tmp/src/
ADD package.json  /tmp/src/
ADD package-lock.json /tmp/src/
USER 1001
RUN npm install
RUN npm install -g pm2
ENV PATH="./tmp/src/node_modules/.bin:$PATH"
ADD . /tmp/src/
# Start the server
CMD [ "npm", "run", "pm2" ]