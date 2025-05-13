import {Component, OnInit} from '@angular/core';
import {ShowService} from '../service/show.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowByIdModel} from '../model/ShowByIdModel';
import {DatePipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-show-id',
  standalone: true,
  imports: [
    UpperCasePipe,
    DatePipe
  ],
  templateUrl: './show-id.component.html',
  styleUrl: './show-id.component.css'
})
export class ShowIdComponent implements OnInit {

  showById: ShowByIdModel | undefined;
  errorMessage: string | null = null;

  constructor(private showService: ShowService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getShow();
  }


  getShow() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id) || id <= 0) {
      this.router.navigate(['/spectacles'])
    }

    this.showService.getShow(id).subscribe(
      (showById) => {
        this.showById = showById;
        this.errorMessage = null;
        // console.log(this.showById)
      },
      (err) => {
        // console.error('Erreur lors de la récupération du Spectacle', err);
        this.errorMessage = "Le spectacle n'existe pas";
      }
    )
  }

}
