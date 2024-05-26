import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/core/api/user.service';
import { UserRatingsDTO } from 'src/app/shared/interfaces/DTOs/UserRatingsDTO';

@Component({
  selector: 'app-ratings-list',
  templateUrl: './ratings-list.component.html',
  styleUrls: ['./ratings-list.component.scss'],
})
export class RatingsListComponent implements OnInit {
  @Input() ratings!: UserRatingsDTO[];

  @Output() refresh = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
