# Client side

This directory contains a modified version of [create-react-app](https://github.com/facebookincubator/create-react-app),
but can easily be replaced with an fresh version,
by deleting the `client/` folder, and executing the following in a terminal.

```shell
$ create-react-app client
```

__IMPORTANT__ you must add the server proxy to the `package.json` afterwards.
otherwise the api calls wont work in development. Read more about [proxying API requests in development, with create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development)

```diff
 {
   "name": "client",
   "version": "0.1.0",
   "private": true,
+  "proxy": "http://localhost:3001/",
   ...
 }
```

See the create-react-app [user guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md), for more information.