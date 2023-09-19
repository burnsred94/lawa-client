import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitalProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initalProps = await Document.getInitialProps(ctx);
    return { ...initalProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head>
          <script dangerouslySetInnerHTML={{
              __html: `
                   (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N3HKN3ZP');`,
            }}></script>
        </Head>
        <body>
            <noscript dangerouslySetInnerHTML={{ __html: `https://www.googletagmanager.com/ns.html?id=GTM-N3HKN3ZP"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>

            <Main />
            <NextScript />
            <script dangerouslySetInnerHTML={{
              __html: `
                   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                   m[i].l=1*new Date();
                   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                   ym(88485289, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                   });
                            `,
            }}></script>
            <noscript>
              <div>
                <img src="https://mc.yandex.ru/watch/88485289" style={{ position: "absolute", left: "-9999px" }}
                />
              </div>
            </noscript>
          </body>
      </Html>
    );
  }
}

export default MyDocument;
