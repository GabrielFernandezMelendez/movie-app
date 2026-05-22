import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe, DecimalPipe } from '@angular/common';
import { MoviesService } from '../movies';
import { Movie } from '../interfaces/movie.interface';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [RouterLink, SlicePipe, DecimalPipe],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit {
  private moviesService: MoviesService = inject(MoviesService);

  movies = signal<Movie[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit() {
    this.moviesService.getPopularMovies().subscribe({
      next: (response: { results: Movie[] }) => {
        this.movies.set(response.results);
        this.loading.set(false);
      },
      error: (_err: Error) => {
        this.error.set('Error al cargar las películas.');
        this.loading.set(false);
      }
    });
  }

  getPosterUrl(path: string): string {
    return this.moviesService.getPosterUrl(path);
  }
}