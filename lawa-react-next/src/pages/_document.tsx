import { Html, Head, Main, NextScript } from 'next/document'
import { CSSProperties } from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{
          __html: `
                    (function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
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
        }} />
        <noscript><div><img src="https://mc.yandex.ru/watch/88485289" style={{ position: "absolute", left: "-9999px" }} alt="" /></div></noscript>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-250028760-1"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', 'UA-250028760-1');
                  `
        }} />
      </body>
    </Html>
  )
}
