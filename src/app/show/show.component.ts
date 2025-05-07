import {Component, OnInit} from '@angular/core';
import {Show} from '../model/ShowModel';
import {ShowService} from '../service/show.service';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-show',
    standalone: true,
    imports: [
        DatePipe
    ],
    templateUrl: './show.component.html',
    styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit {

    shows: Show[] = [];

    constructor(private showService: ShowService) {
    }

    ngOnInit(): void {
        this.getAllShows();
    }

    getAllShows(){
        this.showService.getAllShows().subscribe(
            (results:any) => {
                if( results && results._embedded && results._embedded.showList) {
                    this.shows = results._embedded.showList;
                    console.log(this.shows);
                } else {
                    console.error('Error : Structure de la réponse inattendue')
                }
            }, (error) => {
                console.error('Error lors de la requête HTTP', error);
            }
        );
    }

}
