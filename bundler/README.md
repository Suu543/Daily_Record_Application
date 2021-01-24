![img](https://cdn-images-1.medium.com/max/800/1*1ugE3ZNkhQCfLP71SCUWPA.png)

![img](https://cdn-images-1.medium.com/max/800/1*u_PLlAvhoaMQhJF78LZOPw.png)

![img](https://cdn-images-1.medium.com/max/800/1*9qCq9BfF2fewsrWZNr5FQQ.png)

![img](https://cdn-images-1.medium.com/max/800/1*_UR9egsHm1HV6JQh3UDvVg.png)

![img](https://cdn-images-1.medium.com/max/800/1*fGilgfOO8l3NJwrp8sAm9w.png)

![img](https://cdn-images-1.medium.com/max/800/1*Ox6Xe0kT7bUkx43mbvbHag.png)

**Yes Server Request**

![img](https://cdn-images-1.medium.com/max/800/1*HH8e1qa1_qMgsj0Lbhsr7w.png)

**No Server Request**

![img](https://cdn-images-1.medium.com/max/800/1*MXlVIzTb9dHcHD_GnNeerQ.png)

![img](https://cdn-images-1.medium.com/max/800/1*bIr5O3jEaBXE6pExx_4REA.png)

![img](https://cdn-images-1.medium.com/max/800/1*7Fn8IzxsCXzhmMP2W8MuJQ.png)

![img](https://cdn-images-1.medium.com/max/800/1*mT3ZrUb8IHPptLagFv7VzQ.png)

![img](https://cdn-images-1.medium.com/max/800/1*LUJre6EVN4k2ZZJ-Ix5_FA.png)

![img](https://cdn-images-1.medium.com/max/800/1*PzwzEFK2q8GLUXch81oMZw.png)

![img](https://cdn-images-1.medium.com/max/800/1*mmZsDa_S_O0Alkx5_zzQVw.png)

![img](https://cdn-images-1.medium.com/max/800/1*thcAATPSXdXl75_zoPAiLw.png)

NpmInstallWebpackPlugin

- Speed up development by automatically installing & saving dependencies with Webpack
- 서버의 부하가 크기 때문에 이 방식은 이번 프로젝트에 적합한 방식은 아니다

![img](https://cdn-images-1.medium.com/max/800/1*QfqRE_CXnSQzDoxej7ApIg.png)

- This is essentially identical to this previous option, #1. The only difference is that we’re saying that we’re not going to actively save this dependency onto our local machine. Instead, we might decide to just reach out to every single item to the registry somewhat. Whenever someone tries to import react to their little snippet of code, we could definitely try to cache this result and make sure that we’re not just always downloading the same file over and over again. But essentially, at the end of the day, we’re just saying we’re not going to install react as an entire big heavyweight dependency into our backend API

![img](https://cdn-images-1.medium.com/max/800/1*ddi7dSZ8m6CB9s_1MvmL_g.png)

- In this solution, we’re going to implement all this kind of web processing stuff directly into our React APP. This means that we’re not going to have to make some kind of outside request to our API, which in theory should speed up the process of running our user's code because now we don’t need to make that entire additional request. In addition, another big upside to this approach is that now it would be a user’s machine. It’d be up to a user to reach out to NPM and download an individual file, as opposed to having tons and tons of requests coming from our server. Our API server that you and I might have to put together.
- Option number two and number three are essentially equivalent in nature. The only difference is where we are doing this bundling process. Are we doing it on some API that you and I are putting together? Where are we going to do it on the react application itself?

![img](https://cdn-images-1.medium.com/max/800/1*9vcQaT8Vp437Ak8sh1oZpg.png)

![img](https://cdn-images-1.medium.com/max/800/1*9vcQaT8Vp437Ak8sh1oZpg.png)

![img](https://cdn-images-1.medium.com/max/800/1*dLtdeiX_gKV-x1Upx2Nd8w.png)

![img](https://cdn-images-1.medium.com/max/800/1*zAzAjJt19yzAFMOutoQSTQ.png)

![img](https://cdn-images-1.medium.com/max/800/1*CnEy4h5rFdzR_3LNAitxlA.png)

- ESBuild is a single standalone tool that completely replaces both Babel and Wepback. It is a single tool that we can safely run inside the browser that can transport JavaScript code and bundle it at the exact same time.

[**evanw/esbuild**
*Our current build tools for the web are 10-100x slower than they could be: The main goal of the esbuild bundler project…*github.com](https://github.com/evanw/esbuild)

[**esbuild - An extremely fast JavaScript bundler**
*An extremely fast JavaScript bundler Above: the time to do a production bundle of 10 copies of the three.js library…*esbuild.github.io](https://esbuild.github.io/)

