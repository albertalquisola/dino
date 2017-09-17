# PRODUCTION Dockerfile
FROM albertalquisola/tra-core:0.0.1
MAINTAINER Albert <aalquiso@gmail.com>

# Making runit service directories
RUN mkdir -p /root/tra/logs

# Scripts to run on startup
COPY docker/scripts/profile /etc/profile.d/

# Copy over all app files
COPY . /root/tra
RUN /bin/cp -fRT /tmp/node_modules/ /root/tra/node_modules/

# install node modules
RUN npm install

# Install NVM for node version manager
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash

ENV NODE_PATH /root/tra/node_modules:/root/tra/lib:/root/tra:/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript

# Ports:
# 3000: tra endpoints
# 8080: node-inspector server
EXPOSE 3000 8080

CMD /sbin/my_init -- ./start.sh
