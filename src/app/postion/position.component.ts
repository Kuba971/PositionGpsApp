import { Component, Input, OnInit } from '@angular/core';
import { PositionService } from './position.service';
import { Position } from './position.model';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-position',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './position.component.html',
  styleUrl: './position.component.css'
})

export class PositionComponent implements OnInit {
    
  positions!: Position[];
  selectedPositions: Position[] = [];
  lessThan10Km = undefined;
  positionName = '';
  positionLongitude = '';
  positionLatitude = '';

  newPosition: Position = {
    positionId: '',
    positionName: '',
    positionLatitude: '',
    positionLongitude: '',
    isChecked: false
    };

    onSubmit() {
      this.createPosition();
    }
    onDelete() {
        this.deletePosition(this.selectedPositions![0].positionId)
    }

    onEvaluateDistance() {
        this.evaluateDistance(this.selectedPositions![0].positionId, this.selectedPositions![1].positionId);
    }
    
    constructor(private positionService: PositionService) { }

    ngOnInit() {
        this.fetchPositions();
    }

    fetchPositions() {
      this.positionService.fetchPositions()
          .subscribe(
              (response) => {
                  this.positions = response;
              },
              (error) => {
                  console.error(error);
              }
          );
  }

  createPosition() {
      this.positionService.createPosition(this.newPosition)
          .subscribe(
              (response) => {
                  console.log('Position created:', response);
                  // Refresh the position list after creating a new position
                  this.fetchPositions();
            
              },
              (error) => {
                  console.error(error);
              }
          );
  }

  deletePosition(positionId: String) {
      this.positionService.deletePosition(positionId)
          .subscribe(
              () => {
                  console.log('Position deleted');
                  // Refresh the position list after deleting a position
                  this.fetchPositions();
              },
              (error) => {
                  console.error(error);
              }
          );
  }

  evaluateDistance(positionId1: String, positionId2: String) {
    this.positionService.evaluateDistancePosition(positionId1, positionId2)
        .subscribe(
            (response) => {
                console.log('Evaluate the distance between ');
                this.lessThan10Km = response;
            },
            (error) => {
                console.error(error);
        }
    );
  }
  onCheck(position: Position) {
    let index = this.selectedPositions.indexOf(position);
    if (index == -1) {
        this.selectedPositions.push(position);
    } else {
        this.selectedPositions.splice(index, 1);
    }

    console.log(this.selectedPositions.length);
  }
}