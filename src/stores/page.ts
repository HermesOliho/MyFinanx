// Une store pour gérer l'état de la page actuelle dans une application Vue.js
// Elle Gère le titre de la page, le titre du module (à afficher sur la navbar)
import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
  state: () => ({
    pageTitle: 'Tableau de bord',
    moduleTitle: 'Accueil',
  }),
  actions: {
    setPageTitle(title: string) {
      this.pageTitle = title;
    },
    setModuleTitle(title: string) {
      this.moduleTitle = title;
    },
  },
});
