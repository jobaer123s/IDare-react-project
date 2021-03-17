# Live Development Dockerfile
### STAGE 1: Build ###
#FROM node:10.15.2-alpine as node_build
#RUN apk update && \
#    apk add git

# set working directory
#RUN mkdir /var/www/sheraspace/admin_sheraspace_ui -p
#WORKDIR /var/www/sheraspace/admin_sheraspace_ui
# add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /var/www/sheraspace/admin_sheraspace_ui/node_modules/.bin:$PATH
#RUN env NODE_OPTIONS=--max_old_space_size=8096
#ADD . /var/www/sheraspace/admin_sheraspace_ui
#RUN apk --no-cache add --virtual native-deps \
#  g++ gcc libgcc libstdc++ linux-headers make python && \
#  npm install --quiet node-gyp -g &&\
#  npm install --quiet && \
#  apk del native-deps

#RUN npm install
#RUN apiUrl=https://devapi.palettebd.com npm run build && apiUrl=https://devapi.palettebd.com npm run export
### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine
ADD . .
RUN cp -r /out/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
