import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {ShowService} from '../service/show.service';
import {LocationService} from '../service/location.service';
import {Show} from '../model/ShowModel';
import {Location} from '../model/LocationModel';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  shows: Show[] = [];
  locations: Location[] = [];
  showForm!: FormGroup;
  selectedLocation?: Location;
  successMessage = '';
  errorMessage = '';

  constructor(
    private showService: ShowService,
    private locationService: LocationService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getAllShows();
    this.loadLocations();

    this.showForm = this.formBuilder.group({
      title: ['', Validators.required],
      slug: [{value: '', disabled: true}],
      posterUrl: [''],
      duration: [0, [Validators.required, Validators.min(1)]],
      created_in: [], // auto-generated
      bookable: [true],
      locationId: ['', Validators.required]
    });

    this.showForm.get('title')?.valueChanges.subscribe(title => {
      const slug = this.generateSlug(title);
      this.showForm.get('slug')?.setValue(slug, {emitEvent: false});
    });
  }

  getAllShows(): void {
    this.showService.getAllShows().subscribe({
      next: (results: any) => {
        if (results && results._embedded?.showList) {
          this.shows = results._embedded.showList;
        } else {
          console.error('Structure inattendue :', results);
        }
      },
      error: (err) => console.error('Erreur lors du chargement des spectacles :', err)
    });
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (locs) => {
        // Assure-toi que les données reçues correspondent bien au modèle `Location[]`
        this.locations = locs.map((loc: any) => ({
          id: loc.id,
          slug: loc.slug,
          designation: loc.designation,
          address: loc.address,
          website: loc.website,
          phone: loc.phone,
          locality: loc.locality // Assure-toi que `locality` est bien du type `Locality`
        }));
      },
      error: (err) => console.error('Erreur lors du chargement des lieux :', err)
    });
  }

  generateSlug(title: string): string {
    return title.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }

  onLocationSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Sécurise le type de l'élément

    if (selectElement) {
      const locationId = selectElement.value;
      const location = this.locations.find(loc => loc.id === +locationId);  // Convertir `locationId` en nombre

      if (location) {
        this.selectedLocation = location;  // Stocke la location sélectionnée
      }
    }
  }


  onSubmit(): void {
    if (this.showForm.valid && this.selectedLocation) {
      const formValue = this.showForm.getRawValue();

      const show: Show = {
        id: null,
        title: formValue.title,
        slug: this.generateSlug(formValue.title),
        posterUrl: formValue.posterUrl,
        duration: formValue.duration,
        created_in: new Date().toISOString().split('.')[0], // format : "2024-12-31T23:00:00"
        bookable: formValue.bookable,
        location: this.selectedLocation // Assure-toi que `selectedLocation` est bien du type `Location`
      };

      this.showService.addShow(show).subscribe({
        next: () => {
          this.successMessage = 'Spectacle ajouté avec succès';
          this.errorMessage = '';
          this.showForm.reset({bookable: true});
          this.selectedLocation = undefined;
          this.getAllShows(); // refresh list
        },
        error: (err) => {
          console.error('Erreur POST:', err);
          this.successMessage = '';
          this.errorMessage = 'Erreur lors de l\'ajout du spectacle';
        }
      });
    }
  }
}
