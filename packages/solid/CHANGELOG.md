## @capri-js/solid [4.0.1-next.1](https://github.com/capri-js/capri/compare/@capri-js/solid@4.0.0...@capri-js/solid@4.0.1-next.1) (2022-06-27)


### Bug Fixes

* update README ([7c33d17](https://github.com/capri-js/capri/commit/7c33d17a9549bba23c646c5f5886ecc7bd08ff0e))





### Dependencies

* **capri:** upgraded to 4.1.0-next.1

# @capri-js/solid [4.0.0](https://github.com/capri-js/capri/compare/@capri-js/solid@3.1.3...@capri-js/solid@4.0.0) (2022-06-25)


### Bug Fixes

* add typings for virtual:capri-component ([97f76cf](https://github.com/capri-js/capri/commit/97f76cf1a12ffc7b77abe549558a7186924345f6))
* don't render unneeded hydration data ([f3cffd8](https://github.com/capri-js/capri/commit/f3cffd848dee7733de4698aeaa9be5c62ba8a873))


### Features

* make plugin the main export ([7b0a55d](https://github.com/capri-js/capri/commit/7b0a55dd45630d13683a4ab9b93593a9203bd260))
* no more hocs, naming pattern is enough ([33dbaa5](https://github.com/capri-js/capri/commit/33dbaa5a5ae841835144d418c8d95d3b4346394a))


### BREAKING CHANGES

* The Vite plugin is now the main export of all adapter packages. All render functions are now exported under /server
* Islands and lagoons no longer need to create a higher order component. Naming the files accordingly is enough. In order for this to work, islands and lagoons now need to expose themselves as default export.





### Dependencies

* **capri:** upgraded to 4.0.0

# @capri-js/solid [4.0.0-next.2](https://github.com/capri-js/capri/compare/@capri-js/solid@4.0.0-next.1...@capri-js/solid@4.0.0-next.2) (2022-06-25)


### Bug Fixes

* don't render unneeded hydration data ([f3cffd8](https://github.com/capri-js/capri/commit/f3cffd848dee7733de4698aeaa9be5c62ba8a873))

# @capri-js/solid [4.0.0-next.1](https://github.com/capri-js/capri/compare/@capri-js/solid@3.1.3...@capri-js/solid@4.0.0-next.1) (2022-06-23)


### Bug Fixes

* add typings for virtual:capri-component ([97f76cf](https://github.com/capri-js/capri/commit/97f76cf1a12ffc7b77abe549558a7186924345f6))


### Features

* make plugin the main export ([7b0a55d](https://github.com/capri-js/capri/commit/7b0a55dd45630d13683a4ab9b93593a9203bd260))
* no more hocs, naming pattern is enough ([33dbaa5](https://github.com/capri-js/capri/commit/33dbaa5a5ae841835144d418c8d95d3b4346394a))


### BREAKING CHANGES

* The Vite plugin is now the main export of all adapter packages. All render functions are now exported under /server
* Islands and lagoons no longer need to create a higher order component. Naming the files accordingly is enough. In order for this to work, islands and lagoons now need to expose themselves as default export.





### Dependencies

* **capri:** upgraded to 4.0.0-next.1

## @capri-js/solid [3.1.3](https://github.com/capri-js/capri/compare/@capri-js/solid@3.1.2...@capri-js/solid@3.1.3) (2022-06-19)





### Dependencies

* **capri:** upgraded to 3.3.0

## @capri-js/solid [3.1.2](https://github.com/capri-js/capri/compare/@capri-js/solid@3.1.1...@capri-js/solid@3.1.2) (2022-06-19)





### Dependencies

* **capri:** upgraded to 3.2.0

## @capri-js/solid [3.1.1](https://github.com/capri-js/capri/compare/@capri-js/solid@3.1.0...@capri-js/solid@3.1.1) (2022-06-17)


### Bug Fixes

* update README ([06fb308](https://github.com/capri-js/capri/commit/06fb308e61b65fba75645ac1c9ddd1e085b125ae))

# @capri-js/solid [3.1.0](https://github.com/capri-js/capri/compare/@capri-js/solid@3.0.4...@capri-js/solid@3.1.0) (2022-06-17)


### Features

* support lagoons ([cc83d70](https://github.com/capri-js/capri/commit/cc83d701a93c6353055d9a93b2e383211af79a01))





### Dependencies

* **capri:** upgraded to 3.1.0

## @capri-js/solid [3.0.4](https://github.com/capri-js/capri/compare/@capri-js/solid@3.0.3...@capri-js/solid@3.0.4) (2022-06-16)





### Dependencies

* **capri:** upgraded to 3.0.3

## @capri-js/solid [3.0.3](https://github.com/capri-js/capri/compare/@capri-js/solid@3.0.2...@capri-js/solid@3.0.3) (2022-06-16)


### Bug Fixes

* re-export the RenderFunction type ([2375032](https://github.com/capri-js/capri/commit/2375032251774d8ce6218560b3b6b86b9b7518f8))

## @capri-js/solid [3.0.2](https://github.com/capri-js/capri/compare/@capri-js/solid@3.0.1...@capri-js/solid@3.0.2) (2022-06-15)





### Dependencies

* **capri:** upgraded to 3.0.2

## @capri-js/solid [3.0.1](https://github.com/capri-js/capri/compare/@capri-js/solid@3.0.0...@capri-js/solid@3.0.1) (2022-06-15)


### Bug Fixes

* add main field ([854cb1a](https://github.com/capri-js/capri/commit/854cb1a497fc759b465d6082e21668436ac0be2e))
* typesVersions ([52fb7d8](https://github.com/capri-js/capri/commit/52fb7d8ad3d81e484a6ff81736b262bd44d7b9a0))





### Dependencies

* **capri:** upgraded to 3.0.1

# @capri-js/solid [3.0.0](https://github.com/capri-js/capri/compare/@capri-js/solid@2.0.2...@capri-js/solid@3.0.0) (2022-06-15)


### Bug Fixes

* remove custom export condition ([068088a](https://github.com/capri-js/capri/commit/068088a38354fce79cfaec588ccd473d72ebc14a))


### BREAKING CHANGES

* The vite plugin now needs to be imported from @capri-js/<framework>/vite-plugin





### Dependencies

* **capri:** upgraded to 3.0.0

## @capri-js/solid [2.0.2](https://github.com/capri-js/capri/compare/@capri-js/solid@2.0.1...@capri-js/solid@2.0.2) (2022-06-15)





### Dependencies

* **capri:** upgraded to 2.0.2

## @capri-js/solid [2.0.1](https://github.com/capri-js/capri/compare/@capri-js/solid@2.0.0...@capri-js/solid@2.0.1) (2022-06-15)


### Bug Fixes

* make island glob pattern configurable ([fcd14b3](https://github.com/capri-js/capri/commit/fcd14b3c8569da823726789cd9f2b7ea9156b9d5))





### Dependencies

* **capri:** upgraded to 2.0.1

# @capri-js/solid [2.0.0](https://github.com/capri-js/capri/compare/@capri-js/solid@1.1.1...@capri-js/solid@2.0.0) (2022-06-14)


### Features

* support layout islands ([f46de05](https://github.com/capri-js/capri/commit/f46de05217421bac212ea00822f6d47941b99c84))


### BREAKING CHANGES

* The island function is no longer exposed via a virtual module but must be imported from the framework adapter package.





### Dependencies

* **capri:** upgraded to 2.0.0

## @capri-js/solid [1.1.1](https://github.com/capri-js/capri/compare/@capri-js/solid@1.1.0...@capri-js/solid@1.1.1) (2022-06-12)





### Dependencies

* **@capri-js/vite-plugin:** upgraded to 1.2.1

# @capri-js/solid [1.1.0](https://github.com/capri-js/capri/compare/@capri-js/solid@1.0.6...@capri-js/solid@1.1.0) (2022-06-12)


### Features

* add prerender and followLinks options ([8b390fe](https://github.com/capri-js/capri/commit/8b390fe24c08d57647c1b17af3bc8cc3934adbf3))





### Dependencies

* **@capri-js/vite-plugin:** upgraded to 1.2.0

## @capri-js/solid [1.0.6](https://github.com/capri-js/capri/compare/@capri-js/solid@1.0.5...@capri-js/solid@1.0.6) (2022-06-11)





### Dependencies

* **@capri-js/vite-plugin:** upgraded to 1.1.0

## @capri-js/solid [1.0.5](https://github.com/capri-js/capri/compare/@capri-js/solid@1.0.4...@capri-js/solid@1.0.5) (2022-06-09)





### Dependencies

* **@capri-js/vite-plugin:** upgraded to 1.0.4

## @capri-js/solid [1.0.4](https://github.com/capri-js/capri/compare/@capri-js/solid@1.0.3...@capri-js/solid@1.0.4) (2022-06-02)


### Bug Fixes

* add .npmignore ([2ade226](https://github.com/capri-js/capri/commit/2ade2261eb4bd3918deea53a010bff5cd7322ca7))





### Dependencies

* **@capri-js/vite-plugin:** upgraded to 1.0.3

## @capri-js/solid [1.0.3](https://github.com/capri-js/capri/compare/@capri-js/solid@1.0.2...@capri-js/solid@1.0.3) (2022-06-02)


### Bug Fixes

* SSROptions are not in the UserConfig type ([f4358ee](https://github.com/capri-js/capri/commit/f4358ee632009171f77a4fb74e88919c4b752d15))

## @capri-js/solid [1.0.2](https://github.com/capri-js/capri/compare/@capri-js/solid@1.0.1...@capri-js/solid@1.0.2) (2022-06-01)


### Bug Fixes

* export types ([9377dbf](https://github.com/capri-js/capri/commit/9377dbf6cafe00e6e1de0137ddb525df40f603bc))
* make plugin options optional ([152d371](https://github.com/capri-js/capri/commit/152d3717bfa4ed4f43eb3c0683a12bb9d5ac7351))





### Dependencies

* **@capri-js/vite-plugin:** upgraded to 1.0.2

## @capri-js/solid [1.0.1](https://github.com/capri-js/capri/compare/@capri-js/solid@1.0.0...@capri-js/solid@1.0.1) (2022-06-01)


### Bug Fixes

* make solid-app-router work ([c53ed9e](https://github.com/capri-js/capri/commit/c53ed9eec7a0b93d730249b1df3d70672482da0e))





### Dependencies

* **@capri-js/vite-plugin:** upgraded to 1.0.1

# @capri-js/solid 1.0.0 (2022-05-30)


### Bug Fixes

* prepare for initial release ([483f930](https://github.com/capri-js/capri/commit/483f9300986faba9cdd1d47f85b6e7173c11a797))





### Dependencies

* **@capri-js/vite-plugin:** upgraded to 1.0.0

# @capri-js/solid [1.0.0-next.3](https://github.com/capri-js/capri/compare/@capri-js/solid@1.0.0-next.2...@capri-js/solid@1.0.0-next.3) (2022-05-29)


### Bug Fixes

* dependencies ([f204801](https://github.com/capri-js/capri/commit/f20480113fd3386f9cecd575115aeb260ef7c727))

# @capri-js/solid [1.0.0-next.2](https://github.com/capri-js/capri/compare/@capri-js/solid@1.0.0-next.1...@capri-js/solid@1.0.0-next.2) (2022-05-29)


### Bug Fixes

* trigger msr run ([d71d8c7](https://github.com/capri-js/capri/commit/d71d8c75bf960cfab527d4117dd4eb4d35f72996))

# @capri-js/solid 1.0.0-next.1 (2022-05-29)


### Features

* prepare for release ([9929354](https://github.com/capri-js/capri/commit/9929354de8f7f4b732dfe66fb1ca9e165bc53deb))
