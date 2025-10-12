# MyFinanx — Gestion des finances perso (Vue 3 + Vite + Bun)

Application de suivi des entrées et sorties d’argent. Front en Vue 3 (Vite), styles avec Bootstrap 5, back-end et authentification via Supabase.

## Fonctionnalités

- Ajout, modification, suppression de transactions (revenus et dépenses)
- Catégorisation des transactions (income/expense)
- Filtrage par période et catégorie
- Totaux et solde courant
- Authentification Supabase (email/magic link ou OAuth)
- Données stockées dans Supabase avec RLS (Row Level Security)

## Stack

- Vue 3 + Vite
- Bun (gestion des dépendances et scripts)
- Bootstrap 5
- Supabase (Postgres, Auth, RLS)

## Prérequis

- Bun: https://bun.sh
- Un projet Supabase: https://supabase.com

## Installation

1. Cloner le dépôt, puis installer les dépendances:

```bash
git clone https://github.com/HermesOliho/MyFinanx.git
cd MyFinanx
bun install
```

2. Créer un projet Supabase et configurer la base de données:
   - Créer une table `transactions` avec les colonnes:
     - `id` (UUID, primary key, default: `gen_random_uuid()`)
     - `user_id` (UUID, foreign key vers `auth.users.id`)
     - `amount` (numeric)
     - `type` (text, 'income' ou 'expense')
     - `category` (text)
     - `date` (timestamp)
     - `description` (text, nullable)
   - Activer l'extension `pgcrypto` pour les UUID.
   - Configurer les politiques RLS pour que chaque utilisateur ne puisse accéder qu'à ses propres transactions.
3. Configurer les variables d'environnement:

```bash
cp .env.example .env
# Modifier .env avec les infos de votre projet Supabase
```

4. Lancer le serveur de développement:

```bash
bun run dev
```

5. Accéder à l'application sur `http://localhost:5173`
