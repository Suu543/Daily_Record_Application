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

### Repositories Reducer

```javascript
Repositories Reducer will receive three different kinds of action

-----------------------------------------------------------------------------------------
{ type: 'search_repositories' }
              |
              |
              v
SearchRepositories Action
{ 
  type: "search_repositories"
}

-----------------------------------------------------------------------------------------
{ type: "search_repositories_success", payload: string[] }
              |
              |
              v
SearchRepositoriesSuccess Action 
{ 
  type: "search_repositories_success",  
  payload: ['react', 'react-dom']
}

-----------------------------------------------------------------------------------------
{ type: "search_repositories_success", payload: string }
              |
              |
              v
SearchRepositoriesError Action
{
   type: "search_repositories_error",
   error: "Request Failed"
}
```



### Big Issues with Redux/React-Redux + TypeScript
- Import between files can turn into a mess very quickly
   - In order to prevent this problem we use --> state/index.ts
- Communicating types over to your components can be challenging
- Type def files for Redux, React-Redux, and others are possibly over-engineered 