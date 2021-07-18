import Router from "next/router";
import Page from "components/Page";
import NProgress from "nprogress";
import "components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import withData from "lib/withData";
import Head from "next/head";
import { CartStateProvider } from "lib/cartState";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Head>
          <title>Sick Fits</title>
          <link rel="shortcut icon" href="/static/favicon.ico" />
        </Head>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
