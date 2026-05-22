import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './home/home';
import { MovieList } from './movie-list/movie-list';
import { MovieDetails } from './movie-details/movie-details';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '',       redirectTo: 'home', pathMatch: 'full' },
      { path: 'home',   component: Home },
      { path: 'movies', component: MovieList },
      { path: 'movies/:movieId', component: MovieDetails },
    ]
  },
  { path: '**', component: NotFound }
];