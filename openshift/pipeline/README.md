This directory contains a Jenkinsfile which can be used to build
arpit-profile using an OpenShift build pipeline.

To do this, run:

```bash
# create the nodejs example as usual
oc new-app https://github.com/imarg3/profile

# now create the pipeline build controller from the openshift/pipeline
# subdirectory
oc new-app https://github.com/imarg3/profile \
  --context-dir=openshift/pipeline --name arpit-profile-pipeline
```
