# Simplify

Simplify is a chrome extension used to generate meanings of words selected in a website and ask questions using GPT-3.

## Libraries used

Library Name - Version

"openai": "^3.1.0",
"react": "18.2.0",
"plasmo": "0.65.0",
"react-loader-spinner": "^5.3.4"

## How it Works ?

The extension is present upon installation as we browse and on selecting a text and rightclicking, we can choose the option to simplify which provides us the definition,pronounciation, and part of speech of the word as well as some definitions generated by gpt-3.


https://user-images.githubusercontent.com/76905421/221393729-7385913f-6d6a-488c-8b1f-d07419beed22.mp4




## How to configure

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

