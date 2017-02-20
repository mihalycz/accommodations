import MainContainer from './components/main-container/main-container.component';

let appContainers = document.querySelectorAll('[data-accommodations-app]');
let appContainer = appContainers.length ? appContainers[0] : document.body;
let mainContainer = new MainContainer(appContainer);

mainContainer.render();
