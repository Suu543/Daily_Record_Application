# ReduxStoreDesign

### Searching NPM
- registry.npmjs.org/-/v1/search?text=react or redux or ...

1. We are fetching 'packages' from NPM
2. 'package' is a reserved keyword in TS (like 'for', 'import', etc)
3. We are going to call NPM packages 'repositories'


## Redux Store
```javascript
'Redux Store'

                     ---> data (List of repositories from NPM)
        repositories ---> loading (true/false whether we are fetching data)
                     ---> error (string, error message if one occurred during fetch)

										^
										|
										|

  Action Creators            			       Actions
  - searchRepositories(term)      ------->      - SearchRepositories
                                     			- SearchRepositoriesSuccess
                                     			- SearchRepositoriesError

                                                    ^
                                                    |
                                                    |

                                                Action Types
                                                 - 'search_repositories'
                                                 - 'search_repositories_success'
                                                 - 'search_repositories_error'



'src Folder'

									components
                            
                           App.tsx, RepositoriesList.tsx

									redux stuff
                           index.ts - use single entry point  
                            
                        reducers, action creators, middlewares
```



