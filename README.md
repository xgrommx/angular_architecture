# Site architecture on AngularJS

## Install

    npm install
    npm install -g bower
    npm install -g grunt-cli
    bower install

## Add local host

Unix/Mac:

    echo "127.0.0.1 sitename.local" | sudo tee -a /etc/hosts

Windows cmd:

    echo 127.0.0.1 sitename.local >> %SystemRoot%\system32\drivers\etc\hosts

## Start

    grunt

http://sitename.local:8008