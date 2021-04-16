import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *,
    *:before,
    *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        font-family: 'Fira Sans', sans-serif;
    }
    :root {
  --primary-user-color:  #ff5c00;
  --secondary-user-color: #f49f0a;
  --third-user-color: #efca08;
} 
html, body {
    max-width: 100vw;

    background-color: #232323;
    color: white;
    font-weight: bold;
}
html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 18px;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1.25;
    }
    ol, ul {
        list-style: none;
    }
    a {
        text-decoration: none;
        color: var(--secondary-color);
        &:hover {
            color: var(--accent-color)
        }
    }
`;
