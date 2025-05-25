import { Routes, Route } from 'react-router'
import { MovieProvider } from './contexts/Movie.context'
import routes from './routes'

function App() {
  return (
    <MovieProvider>
      <Routes>
        {
          routes.map(({ path, component: Component }, key)=> (
            <Route
              key={`routeItem-${key.toString()}`}
              path={path}
              element={<Component />}
            />
          ))
        }
      </Routes>
    </MovieProvider>
  )
}

export default App
