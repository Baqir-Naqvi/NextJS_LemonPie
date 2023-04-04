import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Portale di Comfort Home Solutions che permette a qualsiasi utente di sottoscrivere un contratto di installazione e manutenzione di condizionatori e caldaie." />
          <link
            href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=optional"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.png" sizes="any" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument