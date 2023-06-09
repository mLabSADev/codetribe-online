import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  const fonts = [
    "K2D-Bold",
    "K2D-BoldItalic",
    "K2D-ExtraBold",
    "K2D-ExtraBoldItalic",
    "K2D-ExtraLight",
    "K2D-ExtraLightItalic",
    "K2D-Italic",
    "K2D-Light",
    "K2D-LightItalic",
    "K2D-Medium",
    "K2D-MediumItalic",
    "K2D-SemiBold",
    "K2D-SemiBoldItalic",
    "K2D-Thin",
    "K2D-ThinItalic",
  ]

  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {fonts.map(font => {
          return (
            <link
              key={font}
              rel="preload"
              href={`/fonts/k2d/${font}.ttf`}
              as="font"
              crossOrigin="anonymous"
            />
          )
        })}
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <form netlify="true" data-netlify="true">
          <input name="name" hidden />
          <input name="email" hidden />
          <input name="message" hidden />
        </form>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
