import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="icon"
                        type="image/png"
                        href={`${process.env.HOST_URL}/static/assets/icons/icon-72x72.png`}
                    />
                    <link
                        rel="prefetch"
                        href={`${process.env.HOST_URL}/static/assets/fonts/sf-ui-display-black.otf`}
                        as="font"
                        crossOrigin="anonymous"
                    />

                    <link
                        rel="prefetch"
                        href={`${process.env.HOST_URL}/static/assets/fonts/sf-ui-display-bold.otf`}
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="prefetch"
                        href={`${process.env.HOST_URL}/static/assets/fonts/sf-ui-display-light.otf`}
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="prefetch"
                        href={`${process.env.HOST_URL}/static/assets/fonts/sf-ui-display-medium.otf`}
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="prefetch"
                        href={`${process.env.HOST_URL}/static/assets/fonts/sf-ui-display-regular.otf`}
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="72x72"
                        href={`${process.env.HOST_URL}/static/icons/icon-72x72.png`}
                    />
                    <link rel="manifest" href={`${process.env.HOST_URL}/manifest.json`} />
                    <link rel="shortcut icon" href={`${process.env.HOST_URL}/static/assets/icons/icon-192x192.png`} />
                    <Script
                        strategy="lazyOnload"
                        src={`https://www.googletagmanager.com/gtm.js?id=${process.env.GOOGLE_ANALYTICS}`}
                    />
                    <Script
                        strategy="lazyOnload"
                        id="google"
                        dangerouslySetInnerHTML={{
                            __html: `
								window.dataLayer = window.dataLayer || [];
								function gtm(){dataLayer.push(arguments);}
								gtm('js', new Date());
								gtm('config', '${process.env.GOOGLE_ANALYTICS}', {
									page_path: window.location.pathname,
								});
							`,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
