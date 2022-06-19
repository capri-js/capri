# capri [3.3.0](https://github.com/capri-js/capri/compare/capri@3.2.0...capri@3.3.0) (2022-06-19)


### Features

* expose process.env.SSR ([52e43a1](https://github.com/capri-js/capri/commit/52e43a17370ea15d037bb20865bdb3ee070cd1f4))

# capri [3.2.0](https://github.com/capri-js/capri/compare/capri@3.1.0...capri@3.2.0) (2022-06-19)


### Features

* add ssrFormat option ([5ed7a34](https://github.com/capri-js/capri/commit/5ed7a34ec5004dadc67b60b965bf2377be2c033e))
* keep ssr bundle upon errors ([5cf6d4e](https://github.com/capri-js/capri/commit/5cf6d4e39b3e4376b729c436aa81664fbc884df6))

# capri [3.1.0](https://github.com/capri-js/capri/compare/capri@3.0.3...capri@3.1.0) (2022-06-17)


### Features

* support lagoons ([cc83d70](https://github.com/capri-js/capri/commit/cc83d701a93c6353055d9a93b2e383211af79a01))

## capri [3.0.3](https://github.com/capri-js/capri/compare/capri@3.0.2...capri@3.0.3) (2022-06-16)


### Bug Fixes

* modulepreload links ([456b358](https://github.com/capri-js/capri/commit/456b358b188bbad470ab419929110b39dc0be6c9))

## capri [3.0.2](https://github.com/capri-js/capri/compare/capri@3.0.1...capri@3.0.2) (2022-06-15)


### Bug Fixes

* add files field ([164f733](https://github.com/capri-js/capri/commit/164f73374a2a78b8a59895f8fb91e849b7445bbb))

## capri [3.0.1](https://github.com/capri-js/capri/compare/capri@3.0.0...capri@3.0.1) (2022-06-15)


### Bug Fixes

* add main field ([854cb1a](https://github.com/capri-js/capri/commit/854cb1a497fc759b465d6082e21668436ac0be2e))
* typesVersions ([52fb7d8](https://github.com/capri-js/capri/commit/52fb7d8ad3d81e484a6ff81736b262bd44d7b9a0))

# capri [3.0.0](https://github.com/capri-js/capri/compare/capri@2.0.2...capri@3.0.0) (2022-06-15)


### Bug Fixes

* remove custom export condition ([068088a](https://github.com/capri-js/capri/commit/068088a38354fce79cfaec588ccd473d72ebc14a))


### BREAKING CHANGES

* The vite plugin now needs to be imported from @capri-js/<framework>/vite-plugin

## capri [2.0.2](https://github.com/capri-js/capri/compare/capri@2.0.1...capri@2.0.2) (2022-06-15)


### Bug Fixes

* don't externalize capri packages ([1b3bbfc](https://github.com/capri-js/capri/commit/1b3bbfc4fb61bab1cf703d29f20303a2bfa98d2a))

## capri [2.0.1](https://github.com/capri-js/capri/compare/capri@2.0.0...capri@2.0.1) (2022-06-15)


### Bug Fixes

* make island glob pattern configurable ([fcd14b3](https://github.com/capri-js/capri/commit/fcd14b3c8569da823726789cd9f2b7ea9156b9d5))

# capri [2.0.0](https://github.com/capri-js/capri/compare/capri@1.2.1...capri@2.0.0) (2022-06-14)


### Features

* support layout islands ([f46de05](https://github.com/capri-js/capri/commit/f46de05217421bac212ea00822f6d47941b99c84))


### BREAKING CHANGES

* The island function is no longer exposed via a virtual module but must be imported from the framework adapter package.

## capri [1.2.1](https://github.com/capri-js/capri/compare/capri@1.2.0...capri@1.2.1) (2022-06-12)


### Bug Fixes

* resolve relative urls ([7009329](https://github.com/capri-js/capri/commit/7009329f764ea110e42d285a103fc46c70875d36))

# capri [1.2.0](https://github.com/capri-js/capri/compare/capri@1.1.3...capri@1.2.0) (2022-06-12)


### Features

* add prerender and followLinks options ([8b390fe](https://github.com/capri-js/capri/commit/8b390fe24c08d57647c1b17af3bc8cc3934adbf3))

## capri [1.1.3](https://github.com/capri-js/capri/compare/capri@1.1.2...capri@1.1.3) (2022-06-09)


### Bug Fixes

* only preload .js chunks ([4138299](https://github.com/capri-js/capri/commit/4138299bf3673bd7bd6e4a7435737d6841c93e6f))

## capri [1.1.2](https://github.com/capri-js/capri/compare/capri@1.1.1...capri@1.1.2) (2022-06-02)


### Bug Fixes

* add .npmignore ([2ade226](https://github.com/capri-js/capri/commit/2ade2261eb4bd3918deea53a010bff5cd7322ca7))

## capri [1.1.1](https://github.com/capri-js/capri/compare/capri@1.1.0...capri@1.1.1) (2022-06-01)


### Bug Fixes

* pass spa as pathname and respect createIndexFiles option ([e581bec](https://github.com/capri-js/capri/commit/e581bec431197bcd60c2849fd4612963a484655d))
* remove hydration code if no islands are found ([83fc2ca](https://github.com/capri-js/capri/commit/83fc2ca55c9518f9245ee7dee02212585527e956))
* support async html chunks ([4fb1b74](https://github.com/capri-js/capri/commit/4fb1b74c17e52463284ad89fedba10e53286eeb4))

# capri [1.1.0](https://github.com/capri-js/capri/compare/capri@1.0.0...capri@1.1.0) (2022-06-01)


### Bug Fixes

* remove debug output ([74b33d5](https://github.com/capri-js/capri/commit/74b33d5309c5baa7156b9cefbe46b8edef0a17f6))


### Features

* let render return multiple chunks ([61f29f5](https://github.com/capri-js/capri/commit/61f29f5c64a0cb31cc624fbe8feaab90cf142491))

# capri 1.0.0 (2022-05-30)


### Bug Fixes

* prepare for initial release ([483f930](https://github.com/capri-js/capri/commit/483f9300986faba9cdd1d47f85b6e7173c11a797))

# capri 1.0.0-next.1 (2022-05-29)


### Bug Fixes

* trigger msr run ([d71d8c7](https://github.com/capri-js/capri/commit/d71d8c75bf960cfab527d4117dd4eb4d35f72996))
