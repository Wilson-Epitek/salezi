
# Fnac Inventory Management

## Description
Ce projet est une application back-end développée avec **Strapi v5** et connectée à une base de données **SQLite**. Elle permet de gérer les produits, les stocks et les transactions pour trois rôles d'utilisateurs avec des permissions spécifiques :

- **Super Admin** : Accès complet à toutes les fonctionnalités, y compris la gestion des utilisateurs et des permissions.
- **Fnac Manager** : Accès à toutes les données, peut modifier les informations et valider les transactions des Sellers.
- **Seller** : Accès uniquement à ses propres produits, avec la possibilité de demander de nouvelles transactions.

L'application se concentre sur l'interface d'administration (back-office) de Strapi, sans développement de front-office.

---

## Fonctionnalités

- Gestion des produits (ajout, modification, suppression, visualisation)
- Gestion des transactions pour les Sellers
- Validation ou refus des transactions par le Fnac Manager
- Rôles et permissions personnalisés pour restreindre les accès
- Maintien des stocks à un niveau positif
- Tableau de bord personnalisé dans Strapi, affichant des données liées aux stocks et aux ventes

---

## Installation

### Prérequis
Avant de commencer, assurez-vous d'avoir les outils suivants installés :
- [Node.js](https://nodejs.org/) (version LTS recommandée)
- [Git](https://git-scm.com/)
- [SQLite](https://sqlite.org/index.html)

### Étapes d'installation

1. Clonez le dépôt GitHub :
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_PROJET>
   ```

2. Installez les dépendances Node.js :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement Strapi :
   ```bash
   npm run develop
   ```

4. Accédez à l'interface Strapi :
   - Ouvrez votre navigateur et allez à [http://localhost:1337/admin](http://localhost:1337/admin).

5. Configurez un compte **Super Admin** lors de la première connexion.

---

## Structure des données

### Collections
1. **Products**
   - `name` : Nom du produit
   - `price` : Prix
   - `stock` : Quantité disponible (nombre positif uniquement)
   - `seller` : Relation avec l'utilisateur qui gère le produit

2. **Transactions**
   - `product` : Référence au produit concerné
   - `quantity` : Quantité demandée
   - `status` : État de la transaction (en attente, validée, refusée)
   - `seller` : Relation avec l'utilisateur ayant demandé la transaction

3. **Rôles personnalisés**
   - **Super Admin** : Accès complet
   - **Fnac Manager** : Accès total sauf à la gestion des utilisateurs
   - **Seller** : Accès limité à ses produits et transactions

### Permissions
- Les rôles et permissions sont configurés dans **Strapi Admin Panel** pour garantir que chaque utilisateur ne voit et n'interagit qu'avec ses données autorisées.

---

## Tests avec Postman

### Importer la collection
Un fichier **Postman Collection** exporté en JSON est inclus dans le projet.

1. Ouvrez Postman.
2. Cliquez sur **Importer** et sélectionnez le fichier `postman_collection.json`.

### Routes principales testées
#### Produits
- `GET /products` : Voir tous les produits (Fnac Manager) ou les produits personnels (Seller)
- `POST /products` : Ajouter un produit (Seller)
- `PUT /products/:id` : Modifier un produit (Seller uniquement pour ses produits)
- `DELETE /products/:id` : Supprimer un produit (Seller uniquement pour ses produits)

#### Transactions
- `POST /transactions` : Créer une demande de transaction (Seller)
- `GET /transactions` : Voir toutes les transactions (Fnac Manager)
- `PUT /transactions/:id` : Modifier l'état d'une transaction (Fnac Manager uniquement)

---

## Fonctionnalités supplémentaires

1. **Maintien de l'inventaire positif** :  
   - Une règle métier empêche la soumission d'une transaction ou d'une modification si le stock devient négatif.
   - Exemple : Si le stock d'un produit est de 10 et qu'une transaction demande 15 unités, la validation sera bloquée.

2. **Personnalisation du tableau de bord Strapi** :  
   - Ajout d'éléments sur le tableau de bord pour afficher les stocks restants et les ventes totales.
   - Exemple : Affichage d'une section "Produits en rupture de stock" et "Top ventes".

---

## Lancement rapide

1. Clonez le dépôt et installez les dépendances :
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_PROJET>
   npm install
   ```

2. Démarrez le serveur :
   ```bash
   npm run develop
   ```

3. Importez le fichier Postman pour tester les routes.

4. Connectez-vous à [http://localhost:1337/admin](http://localhost:1337/admin) pour accéder à l'administration.

---

## Améliorations possibles
Si vous avez du temps supplémentaire, voici des ajouts suggérés pour enrichir le projet :
- **Rapports avancés sur le tableau de bord** : 
  - Affichage graphique des ventes par période ou produit.
- **Notification par e-mail pour les Sellers** :
  - Notifier un Seller lorsque sa transaction est validée ou refusée.
- **Audit log** : 
  - Enregistrer les actions effectuées par les Fnac Managers et Super Admins.

---

## Détails techniques

- **Langage** : JavaScript / Node.js
- **Framework** : Strapi v5
- **Base de données** : SQLite
- **Gestion des dépendances** : npm
- **Outils de test** : Postman

---

## Contributions
Les contributions sont les bienvenues ! Si vous avez des idées ou des améliorations, n'hésitez pas à ouvrir une **issue** ou à soumettre une **pull request**.

---

Si vous avez des questions ou rencontrez des problèmes, contactez l'auteur via le système d'issues du dépôt GitHub.
