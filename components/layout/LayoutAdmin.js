import React from "react";
import Head from "next/head";

const LayoutAdmin = (props) => {
  return (
    <>
      <Head>
        <title>Admin</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/static/css/App.css" />

        <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon" />

        <link
          rel="stylesheet"
          href="/static/fonts/fontawesome/css/fontawesome-all.min.css"
        />

        <link
          rel="stylesheet"
          href="/static/plugins/animation/css/animate.min.css"
        />
        <link rel="stylesheet" href="/static/css/style.css" />
      </Head>
      <main>{props.children}</main>
      <script src="/static/js/vendor-all.min.js"></script>
      <script src="/static/plugins/bootstrap/js/bootstrap.min.js"></script>
      <script src="/static/js/pcoded.min.js"></script>
    </>
  );
};

export default LayoutAdmin;
