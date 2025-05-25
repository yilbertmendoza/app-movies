import MoviesView from "../views/MoviesView"
import MovieCreateView from "../views/MovieCreateView"
import MovieEditView from "../views/MovieEditView"

export default [
  {
    path: '/',
    component: MoviesView,
  },
  {
    path: '/create',
    component: MovieCreateView,
  },
  {
    path: '/:id/editar',
    component: MovieEditView,
  },
]