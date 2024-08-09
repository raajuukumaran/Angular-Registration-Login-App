import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showComponentsDetails = false;
  showAngularVersionDetails = false;
  showAngularMaterialVersionDetails = false;
  showOtherDependenciesDetails = false;
  showDevDependenciesDetails = false;

  toggleDetails(section: string) {
    switch (section) {
      case 'components':
        this.showComponentsDetails = !this.showComponentsDetails;
        break;
      case 'angularVersion':
        this.showAngularVersionDetails = !this.showAngularVersionDetails;
        break;
      case 'angularMaterialVersion':
        this.showAngularMaterialVersionDetails = !this.showAngularMaterialVersionDetails;
        break;
        case 'devDependencies':
        this.showDevDependenciesDetails = !this.showDevDependenciesDetails;
        break;
      case 'otherDependencies':
        this.showOtherDependenciesDetails = !this.showOtherDependenciesDetails;
        break;
      
      default:
        break;
    }
  }
}
