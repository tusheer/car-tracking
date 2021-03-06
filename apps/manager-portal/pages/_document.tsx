import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="application-name" content="Car Tracking " />
                    <link rel="icon" type="image/png" href={`/static/assets/images/car.png`} />
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
