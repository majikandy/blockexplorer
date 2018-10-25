FROM node:10.3.0

# install git and nano
RUN apt-get update && apt-get install -y nano git npm \
    && echo -e "\nexport TERM=xterm" >> ~/.bashrc

RUN mkdir -p /usr/src/app/source /usr/src/app/build

# clone the repository and build
RUN git clone https://github.com/majikandy/blockexplorer.git /usr/src/app/source
WORKDIR /usr/src/app/source
RUN npm install

# remove git and the sourc
RUN apt-get purge -y --auto-remove git

EXPOSE 3000

ENTRYPOINT [ "yarn",  "start" ]

