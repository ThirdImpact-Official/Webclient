# Webclient
base react web client 

Page architecture 

# Structure des Pages pour l'Application Escape Game

## 1. Page d'Accueil
- `/` (Home)
  - ✅ Bon point d'entrée pour présenter les escape games populaires et les événements à venir
  - Suggestion : Ajouter une section pour les promotions en cours

## 2. Section Profil
- `/profile`
  - `/profile/presentation`
  - `/profile/notification`
  - Suggestions d'ajouts :
    - `/profile/settings` pour les paramètres du compte
    - `/profile/history` pour l'historique des réservations
    - `/profile/favorites` pour les escape games favoris

## 3. Section Escape Games
- `/escape-games`
  - Base
    - `/escape-games/new`
    - `/escape-games/reservations`
    - `/escape-games/all-ratings`
  - Pages spécifiques par jeu
    - `/escape-games/:gameId`
    - `/escape-games/:gameId/edit`
    - `/escape-games/:gameId/ratings`
    - `/escape-games/:gameId/statistics`
  - Événements
    - `/escape-games/event`
    - `/escape-games/:gameId/event`
    - `/escape-games/:gameId/event/edit`
    - `/escape-games/:gameId/event/new`
  - Activités
    - `/escape-games/activity-place`
    - `/escape-games/:gameId/activity-place`

## 4. Section Ressources
- `/resources`
  - Organisation
    - `/resources/organisation`
    - `/resources/organisation/member`
  - Autres ressources
    - `/resources/escapegame`
    - `/resources/faq`
    - `/resources/faq/:id`
    - `/resources/members`

## 5. Section Contact
- `/contact`
  - `/contact/feedback`

## Suggestions d'Améliorations

### Nouvelles Pages à Considérer
1. **Gestion des Réservations**
   - `/reservations/create`
   - `/reservations/:id/edit`
   - `/reservations/calendar-view`

2. **Gestion des Paiements**
   - `/payments/history`
   - `/payments/pending`
   - `/payments/refunds`

3. **Tableau de Bord Administrateur**
   - `/admin/dashboard`
   - `/admin/analytics`
   - `/admin/user-management`

4. **Gestion des Sessions**
   - `/sessions/upcoming`
   - `/sessions/past`
   - `/sessions/:id/details`

### Améliorations de Structure Suggérées
1. Regrouper les pages liées aux événements sous une route dédiée
2. Ajouter une section pour la gestion des promotions
3. Créer une section dédiée aux rapports et statistiques
4. Implémenter une section pour la gestion des avis et modération

## Points d'Attention
1. Certaines routes pourraient bénéficier d'une meilleure hiérarchisation
2. La gestion des permissions devra être clairement définie pour chaque route
3. Considérer l'ajout de routes pour la gestion des erreurs (404, 403, etc.)
4. Penser à l'internationalisation des routes
