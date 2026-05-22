import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { MoviesService } from '../movies';
import { MovieDetail } from '../interfaces/movie.interface';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [DecimalPipe, SlicePipe],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private moviesService: MoviesService = inject(MoviesService);

  movie = signal<MovieDetail | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('movieId');

    if (!movieId) {
      this.error.set('ID de película no válido.');
      this.loading.set(false);
      return;
    }

    this.moviesService.getMovieById(movieId).subscribe({
      next: (data: MovieDetail) => {
        this.movie.set(data);
        this.loading.set(false);
      },
      error: (_err: Error) => {
        this.error.set('No se encontró la película.');
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/movies']);
  }

  getPosterUrl(path: string): string {
    return this.moviesService.getPosterUrl(path);
  }
}