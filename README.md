

<!-- toc -->

- [About Arpit Gupta](#about-arpit-gupta)
  * [OpenShift](#openshift)
    + [Features](#features)
  * [Creating a project](#creating-a-project)
    + [App template (method 2)](#app-template)
    + [Build the app](#build-the-app)
    + [Deploy the app](#deploy-the-app)
    + [Configure routing](#configure-routing)
    + [Success](#success)
    + [Pushing updates](#pushing-updates)
  * [Debugging](#debugging)
  * [Web UI](#web-ui)
  * [Looking for help](#looking-for-help)
  * [Compatibility](#compatibility)
  * [License](#license)

<!-- tocstop -->

## About Arpit Gupta
-----------------

Hello Guys, I am Arpit Gupta. I am a Full Stack Developer & DevOps Engineer who loves to work in different software technologies like Java, Python, JavaScript, PHP, etc. I am an avid lover of open source technologies.

### OpenShift

There are four reasons for me to get started with OpenShift:

  - It is free for 60-days
  - I love to connect with a open source technologies companies such as RedHat
  - Source-to-Image Container support
  - Kubernetes driven web console

#### Features

One option is to use the Openshift is that it provides an easy to access web and console based access such as described in the [OpenShift Website](https://www.openshift.org/).

### Creating a project

After logging in with `oc login` (default username/password: openshift), if you don't have a project setup all ready, go ahead and take care of that:

        $ oc new-project nodejs-echo \
        $ --display-name="nodejs" --description="Sample Node.js app"

That's it, project has been created.  Though it would probably be good to set your current project to this (thought new-project does it automatically as well), such as:

        $ oc project nodejs-echo

#### App template

We can also [create new apps using OpenShift template files](https://docs.openshift.com/enterprise/3.0/dev_guide/new_app.html#specifying-a-template). Clone the demo app source code from [GitHub repo](https://github.com/openshift/nodejs-ex) (fork if you like).

        $ git clone https://github.com/openshift/nodejs-ex

Looking at the repo, you'll notice three files in the openshift/template directory:

	nodejs-ex
	├── openshift
	│   └── templates
	│       ├── nodejs.json
	│       ├── nodejs-mongodb.json
	│       └── nodejs-mongodb-persistent.json
	├── package.json
	├── README.md
	├── server.js
	├── tests
	│   └── app_test.js
	└── views
	    └── index.html

We can create the the new app from the `nodejs.json` template by using the `-f` flag and pointing the tool at a path to the template file:

        $ oc new-app -f /path/to/nodejs.json

#### Build the app

`oc new-app` will kick off a build once all required dependencies are confirmed.

Check the status of your new nodejs app with the command:

        $ oc status

Which should return something like:

        In project nodejs (nodejs-echo) on server https://10.2.2.2:8443

        svc/nodejs-ex - 172.30.108.183:8080
          dc/nodejs-ex deploys istag/nodejs-ex:latest <-
            bc/nodejs-ex builds https://github.com/openshift/nodejs-ex with openshift/nodejs:0.10
              build #1 running for 7 seconds
            deployment #1 waiting on image or update

Note the server address for the web console, as yours will likely differ if you're not using the Vagrant set-up. You can follow along with the web console to see what new resources have been created and watch the progress of builds and deployments.

If the build is not yet started (you can check by running `oc get builds`), start one and stream the logs with:

        $ oc start-build nodejs-ex --follow

You can alternatively leave off `--follow` and use `oc logs build/nodejs-ex-n` where *n* is the number of the build to track the output of the build.

#### Deploy the app

Deployment happens automatically once the new application image is available.  To monitor its status either watch the web console or execute `oc get pods` to see when the pod is up.  Another helpful command is

        $ oc get svc

This will help indicate what IP address the service is running, the default port for it to deploy at is 8080. Output should look like:

        NAME        CLUSTER-IP       EXTERNAL-IP   PORT(S)    SELECTOR                                AGE
        nodejs-ex   172.30.249.251   <none>        8080/TCP   deploymentconfig=nodejs-ex,name=myapp   17m

#### Configure routing

An OpenShift route exposes a service at a host name, like www.example.com, so that external clients can reach it by name.

DNS resolution for a host name is handled separately from routing; you may wish to configure a cloud domain that will always correctly resolve to the OpenShift router, or if using an unrelated host name you may need to modify its DNS records independently to resolve to the router.

That aside, let's explore our new web console, which for our example is running at [https://10.2.2.2:8443](https://10.2.2.2:8443).

After logging into the web console with your same CLI `oc login` credentials, click on the project we just created, then click `Create route`.

If you're running OpenShift on a local machine, you can preview the new app by setting the Hostname to a localhost like: *10.2.2.2*.

This could also be accomplished by running:

        $ oc expose svc/nodejs-ex --hostname=www.example.com

Now navigate to the newly created Node.js web app at the hostname we just configured, for our example it was simply [https://10.2.2.2](https://10.2.2.2).

#### Success

You should now have a Node.js welcome page showing the current hit count, as stored in a MongoDB database.

#### Pushing updates

Assuming you used the URL of your own forked repository, we can easily push changes and simply repeat the steps above which will trigger the newly built image to be deployed.

### Debugging

Review some of the common tips and suggestions [here](https://github.com/openshift/origin/blob/master/docs/debugging-openshift.md).

### Web UI

To run this example from the Web UI, you can same steps following done on the CLI as defined above. Here's a video showing it in motion:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=uocucZqg_0I&t=225" target="_blank">
<img src="http://img.youtube.com/vi/uocucZqg_0I/0.jpg"
alt="OpenShift 3: Node.js Sample" width="240" height="180" border="10" /></a>

### Looking for help

If you get stuck at some point, or think that this document needs further details or clarification, you can give feedback and look for help using the channels mentioned in [the OpenShift Origin repo](https://github.com/openshift/origin), or by filing an issue.

### Compatibility

This repository is compatible with Node.js 6 and higher, excluding any alpha or beta versions.

### License

This code is dedicated to the public domain to the maximum extent permitted by applicable law, pursuant to [CC0](http://creativecommons.org/publicdomain/zero/1.0/).
