import './assets/css/style.css'
import appRoutes from './app-routes.json'

const root = document.getElementById('app')! as HTMLDivElement

root.innerHTML = appRoutes
  .map(route => /* html */ `<a href="${route.href}" class="navigation-link"><h2>${route.name}</h2></a>`)
  .join('')
