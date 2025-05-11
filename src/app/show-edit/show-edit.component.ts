import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ShowService} from '../service/show.service';
import {Location} from '../model/LocationModel';
import {Show} from '../model/ShowModel';
import {ShowByIdModel} from '../model/ShowByIdModel';
import {LocationService} from '../service/location.service';

@Component({
  selector: 'app-show-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './show-edit.component.html',
  styleUrl: './show-edit.component.css'
})
export class ShowEditComponent implements OnInit {

  show: Show | undefined;
  loading: boolean = false;
  location: Location[] | undefined;
  succesMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute, private showService: ShowService, private locationsService: LocationService
  ) {
  }

  ngOnInit(): void {
    const idShow = Number(this.route.snapshot.paramMap.get('id'));
    if (idShow) {
      this.loadShow(idShow);
      this.loadLocations();
    }
  }

  loadShow(idShow: number) {
    this.loading = true;
    this.showService.getShow(idShow).subscribe(
      (data) => {
        this.loadLocationForShow(data);
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error)
        this.loading = false;
      }
    );
  }

  loadLocationForShow(showData: ShowByIdModel) {
    // Appeler LocationService pour récupérer la location via l'ID de la location
    this.locationsService.getLocations().subscribe(
      (locations: Location[]) => {
        if (locations.length > 0) {
          // Prendre la première location du tableau (ou celle qui correspond)
          const location = locations[0];

          // Transformer ShowByIdModel en Show et ajouter la location récupérée
          this.show = {
            id: showData.id,
            title: showData.title,
            slug: showData.slug,
            posterUrl: showData.posterUrl,
            duration: showData.duration,
            created_in: showData.created_in.split('.')[0],
            bookable: showData.bookable,
            location: location // Ajouter la location récupérée ici
          };
        } else {
          console.error('Aucune location trouvée pour le spectacle.');
        }
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la location', error);
        this.loading = false;
      }
    );
  }

  // Fonction pour générer le slug automatiquement à partir du titre
  updateSlug(): void {
    if (this.show && this.show.title) {
      this.show.slug = this.show.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
    }
  }

  // Charger les locations pour le menu déroulant
  loadLocations(): void {
    this.locationsService.getLocations().subscribe(
      (locations) => {
        this.location = locations;
      },
      (error) => {
        console.error('Erreur lors du chargement des locations', error);
      }
    );
  }

  // Formater la date avant d'envoyer au backend
  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    const seconds = ('0' + d.getSeconds()).slice(-2);

    // Renvoie la date au format attendu par Spring (yyyy-MM-dd'T'HH:mm:ss)
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  updateShow(): void {
    if (this.show) {
      this.loading = true;
      // console.log("Données envoyées à l'API:", this.show);

      this.show.created_in = this.formatDate(this.show.created_in);
      console.log("Show à mettre à jour : ", this.show);

      this.showService.updateShow(this.show.id!, this.show).subscribe(
        (updatedShow) => {
          console.log('Show mis à jour avec succès', updatedShow);
          this.succesMessage = 'Le spectacle est bien enregistré';
          this.loading = false;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du Show', error);
          this.errorMessage = 'Mise à jour échouée';
          this.loading = false;
        }
      );
    }
  }
}
